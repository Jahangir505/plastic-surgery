// Checkout.js
import { isEmpty } from "@/helpers/functions";
import useSnackbar from "@/hooks/useSnackbar";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { StripeContainer } from "../../../components/paymentsForm/StripeContainer";
import { useRouter } from "next/router";
import { products } from "@/assets/data/products";
import HomeLayout from "@/HOC/public-layouts/PublicLayout";


const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$5.00"
  },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" }
];
const paymentMethods = [
  { id: 1, value: "stripe", title: "Stripe" },
  { id: 2, value: "paypal", title: "PayPal" }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const validation = (customer, snackbar) => {
  if (
    isEmpty(customer?.first_name) ||
    isEmpty(customer?.last_name) ||
    isEmpty(customer?.email) ||
    isEmpty(customer?.street_address) ||
    isEmpty(customer?.post_code) ||
    isEmpty(customer?.phone) ||
    isEmpty(customer?.city)
  ) {
    if (isEmpty(customer?.first_name)) {
      snackbar("First Name can not be empty!", {
        variant: "error"
      });
    }

    if (isEmpty(customer?.last_name)) {
      snackbar("Last Name can not be empty!", {
        variant: "error"
      });
    }

    if (isEmpty(customer?.email)) {
      snackbar("Email can not be empty!", {
        variant: "error"
      });
    }
    if (isEmpty(customer?.street_address)) {
      snackbar("Street address can not be empty!", {
        variant: "error"
      });
    }

    if (isEmpty(customer?.post_code)) {
      snackbar("Post Code can not be empty!", {
        variant: "error"
      });
    }

    if (isEmpty(customer?.phone)) {
      snackbar("Phone can not be empty!", {
        variant: "error"
      });
    }

    if (isEmpty(customer?.city)) {
      snackbar("City can not be empty!", {
        variant: "error"
      });
    }

    return false;
  } else {
    return true;
  }
};

const Checkout = () => {
  const { data: session, status } = useSession();
  const route = useRouter();
  const product_list = products;
  const [product, setProduct] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("stripe");
  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    street_address: "",
    post_code: "",
    city: ""
  });
  const snackbar = useSnackbar();
  console.log(route);
  const {id} = route.query;
  const getProductById = (productId) => {
    return product_list.find(product => product.id === productId);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    onSubmit();
  };

  useEffect(() => {
    if (session) {
      setCustomer({
        first_name: session?.user?.profile?.firstName,
        last_name: session?.user?.profile?.lastName,
        phone: session?.user?.profile?.phone,
        email: session?.user?.email
      });
    }
  }, [session]);

  useEffect(() => {
    if(id){
      setProduct(product_list.find(product => product.id == id))
    }
  },[id]);

  console.log(product);

  return (
    <HomeLayout>
      <div className="bg-gray-400">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1>Checkout</h1>

        <form
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mt-10 border-t border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Customer information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      disabled={session?.user}
                      type="text"
                      value={session?.user?.profile.firstName}
                      id="first-name"
                      name="first-name"
                      autoComplete="given-name"
                      className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      disabled={session?.user}
                      type="text"
                      id="last-name"
                      value={session?.user?.profile.lastName}
                      name="last-name"
                      autoComplete="family-name"
                      className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      disabled={session?.user}
                      type="text"
                      name="phone"
                      value={session?.user?.profile.phone}
                      id="phone"
                      autoComplete="tel"
                      className="block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      disabled={session?.user}
                      type="email"
                      name="email"
                      value={session?.user?.email}
                      id="email"
                      autoComplete="tel"
                      className="block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div >
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => {
                        setCustomer({
                          ...customer,
                          street_address: e.target.value
                        });
                      }}
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="street-address"
                      className="block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => {
                        setCustomer({
                          ...customer,
                          city: e.target.value
                        });
                      }}
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block p-2  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      onChange={(e) => {
                        setCustomer({
                          ...customer,
                          country: e.target.value
                        });
                      }}
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="post_code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Post Code
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => {
                        setCustomer({
                          ...customer,
                          post_code: e.target.value
                        });
                      }}
                      type="text"
                      name="post_code"
                      id="post_code"
                      autoComplete="address-level1"
                      className="block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                <li key={product?.id} className="flex px-4 py-6 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      src={product?.imageSrc}
                      alt={product?.imageAlt}
                      className="w-20 rounded-md"
                    />
                  </div>

                  <div className="ml-6 flex flex-1 flex-col">
                    <div className="flex">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm">
                          <a
                            href={product?.href}
                            className="font-medium text-gray-700 hover:text-gray-800"
                          >
                            {product?.name}
                          </a>
                        </h4>
                      </div>

                      
                    </div>

                    <div className="flex flex-1 items-end justify-between pt-2">
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {product?.price}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {product?.price}
                  </dd>
                </div>
                {/* <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                </div> */}
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    {product?.price}
                  </dd>
                </div>
              </dl>

              {/* Payment */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <div className="px-9">
                  <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                  <fieldset className="mt-4">
                    <legend className="sr-only">Payment type</legend>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                      {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                        <div
                          key={paymentMethod.id}
                          className="flex items-center"
                        >
                          <input
                            onChange={() =>
                              setSelectedPaymentMethod(paymentMethod.value)
                            }
                            id={paymentMethod.id}
                            name="payment-type"
                            type="radio"
                            checked={
                              selectedPaymentMethod === paymentMethod.value
                            }
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />

                          <label
                            htmlFor={paymentMethod.id}
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            {paymentMethod.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="mt-6 gap-x-4 gap-y-6">
                  {selectedPaymentMethod === "stripe" && (
                    <StripeContainer
                      validationCheck={() => validation(customer, snackbar())}
                      customer={customer}
                      cartItems={product}
                      shippingAddress={customer}
                      amount={product?.price}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </HomeLayout>
  );
};

export default Checkout;
