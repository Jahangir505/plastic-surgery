const stripe = require("stripe")("sk_test_UsLRveHKteIC5ygTJkvsDV7B"); // Test Secret key

export default async function handler(req, res) {
  let { amount, payment_method_id, cartItems, customer, shippingAddress } =
    req.body;
  const newArray = cartItems.map((item) => {
    return {
      sku: item.sku
    };
  });

  let customerID;

  const customerInfo = {
    id: customer.id,
    name: customer.first_name + " " + customer.last_name,
    email: customer.email,
    phone: customer.phone,
    street_address: customer.street_address,
    street_address2: customer.street_address2,
    post_code: customer.post_code,
    city: customer.city,
    country: customer.country
  };
  if (req.method === "POST") {
    try {
      const customers = await stripe.customers.list();

      const existingCustomer = customers.data.find(
        (customer) => customer.email === customerInfo.email
      );

      if (existingCustomer) {
        // Customer already exists
        customerID = existingCustomer.id;
        console.log(
          `Customer with email ${customerInfo.email} already exists. Customer ID: ${existingCustomer.id}`
        );
      } else {
        // Create a new customer
        const newCustomer = await stripe.customers.create({
          name: customerInfo.name,
          email: customerInfo.email,
          address: {
            line1: customerInfo.street_address,
            line2: customerInfo.street_address2,
            city: customerInfo.city,
            state: customerInfo.county,
            postal_code: customerInfo.post_code,
            country: customerInfo.country
          }
        });
        customerID = newCustomer.id;
        console.log(`New customer created. Customer ID: ${newCustomer.id}`);
      }

      // console.log(amount);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "gbp",
        payment_method: payment_method_id,
        confirmation_method: "automatic",
        customer: customerID,
        confirm: true,
        setup_future_usage: "off_session",
        description: "Top Brand Outlet Ltd",
        metadata: {
          cart_items: JSON.stringify(newArray)
        },
        shipping: {
          address: {
            city: shippingAddress.city || customerInfo.city,
            country: shippingAddress.country || customerInfo.country || "GB",
            line1:
              shippingAddress.street_address ||
              customerInfo.street_address ||
              "",
            line2:
              shippingAddress.street_address2 ||
              customerInfo.street_address2 ||
              "",
            postal_code:
              shippingAddress.post_code || customerInfo.post_code || ""
          },
          name: shippingAddress.first_name || customerInfo.name || ""
        }
      });
      res
        .status(200)
        .json({
          client_secret: paymentIntent.client_secret,
          data: paymentIntent
        });
    } catch (error) {
      console.error("ErrorError:===", error);
      res
        .status(500)
        .json({
          error: "An error occurred while processing your payment.",
          data: { status: "failed", error: error }
        });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
