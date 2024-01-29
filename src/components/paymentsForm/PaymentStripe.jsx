import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import useSnackbar from "@/hooks/useSnackbar";
import { useStripeStyle } from "./stripeStyle";

const CARD_OPTION = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#000000",
            fontWeight: 500,
            fontSize: "16px",
            fontSmoothing: "antialiased",
        },

        invalid: {
            iconColor: "red",
            color: "red",
        },
    },
};

export const PaymentStripe = ({
    amount,
    validation,
    orderComplete,
    cartItems,
    customer,
    shippingAddress,
}) => {
    const classes = useStripeStyle();
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const element = useElements();
    const [loading, setLoading] = useState(false);
    const snackbar = useSnackbar();
    const checkValidity = () => {
        const check = validation();
        console.log(check);
        console.log(customer);
        return check;
    };

    // console.log(Math.round(Number(amount) * 100));
   
    // console.log(amount);
    // console.log((Math.round(amount) * 100) - 1);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const check = validation();
        if (!check) {
            setLoading(false);
            return false;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: element.getElement(CardElement),
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const payment = async () => {
                    const response = await fetch("/api/create-payment-intent", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },

                        body: JSON.stringify({
                            amount: Number(amount).toFixed(2) * 100,
                            id,
                            cartItems,
                            customer,
                        }),
                    });
                    return response.json();
                };

                payment().then((data) => {
                    console.log("Stripe Payment", data);
                    const payment_info = {
                        transition_id: data?.data.id,
                        status:
                            data?.data?.status === "succeeded"
                                ? "success"
                                : "failed",
                        payer_name:
                            data?.charges?.data[0].billing_details?.name ?? "",
                        email:
                            data?.charges?.data[0].billing_details?.email ?? "",
                        payer_id: data?.data.id,
                        payment_method: "stripe",
                        refund_link: data?.charges?.data[0].refunds?.url ?? "",
                    };
                    // Popup Design Start
                    const screenWidth = window.screen.width;
                    const screenHeight = window.screen.height;
                    const popupWidth = 400;
                    const popupHeight = 600;

                    const left = (screenWidth - popupWidth) / 2;
                    const top = (screenHeight - popupHeight) / 2;

                    // Popup Design Start
                    if (
                        data.data.next_action &&
                        data.data.next_action.type === "use_stripe_sdk"
                    ) {
                        const stripeJsUrl =
                            data.data.next_action.use_stripe_sdk.stripe_js;

                        // Open a popup with the stripeJsUrl
                        const popupWindow = window.open(
                            stripeJsUrl,
                            "3d-secure",
                            `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
                        );
                        console.log("3D Secure", popupWindow);
                        // Set up an interval to check if the popup is closed
                        const interval = setInterval(() => {
                            if (popupWindow.closed) {
                                clearInterval(interval);
                                const authenticationCompleted = true;
                                if (authenticationCompleted) {
                                    // Backend order placed
                                    orderComplete(payment_info);
                                    popupWindow.close();
                                    setLoading(false);
                                } else {
                                    alert("Payment Failed Please try again!");
                                    setLoading(false);
                                }
                                //   alert("Hello");
                                // Here, you can handle what happens after the 3D Secure authentication is completed.
                                // You might want to check the status of the Payment Intent or complete the payment.
                            }
                        }, 1000);
                        setLoading(false);
                    } else {
                        if (data?.data?.status === "succeeded") {
                            orderComplete(payment_info);
                            setLoading(false);
                        } else {
                            alert("Payment Failed Please try again!");
                            setLoading(false);
                        }
                    }
                });
            } catch (error) {
                // console.log(error)
                setLoading(false);
            }
        } else {
            // console.log(error)
            snackbar(error.message, {
                variant: "error",
            });
            setLoading(false);
        }
    };

    const stripePaymentSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const check = validation();
        if (!check) {
            setLoading(false);
            return false;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: element.getElement(CardElement),
        });

        console.log("Customer", customer);

        if (error) {
            console.error(error.message);
            snackbar(error.message, {
                variant: "error",
            });
            setLoading(false);
        } else { 
            const response = await fetch("/api/payment/stripe-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: Math.round(Number(amount) * 100),
                    payment_method_id: paymentMethod.id,
                    cartItems,
                    customer,
                    shippingAddress,
                }),
            });

            const session = await response.json();
            console.log("Stripe Log", session);
            const payment_info = {
                transition_id: session?.data?.id,
                status:
                session?.data?.status === "succeeded"
                        ? "success"
                        : "failed",
                payer_name:
                session?.charges?.data[0]?.billing_details?.name ?? "",
                email:
                session?.charges?.data[0]?.billing_details?.email ?? "",
                payer_id: session?.data?.id,
                payment_method: "stripe",
                // refund_link: session?.data?.charges?.data[0].refunds?.url ?? "",
            };
            if (session?.data?.status === "failed") {
                const sendMail = async () => {
                    const response = await fetch("/api/order-failed-mail-sender", {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        }, 
                        body: JSON.stringify({
                            details: session?.data,
                            cart_items: cartItems,
                            customer,
                        }),
        
                    });
                    return response.json();
                }
                sendMail();
                console.log("ErrorErrorError",session?.data?.error?.raw?.message);
                snackbar(session?.data?.error?.raw?.message, {
                    variant: "error",
                });
                setLoading(false);
            } else if (session.data.status !== "succeeded") {
                const result = await stripe.confirmCardPayment(
                    session.client_secret
                );
                
                if (result.error) {
                    
                    snackbar(result?.error?.message, {
                        variant: "error",
                    });
                    setLoading(false);
                } else {
                    if (result.paymentIntent.status === "succeeded") {
                        console.log("Payment succeeded!");
                        orderComplete(payment_info);
                        setLoading(false);
                    } else {
                        console.log("Payment failed!", result.paymentIntent);
                        setLoading(false);
                    }
                }
            } else {
                console.log("Payment Succeeded!", session.data);
                orderComplete(payment_info);
                setLoading(false);
            }
            setLoading(false);
        }
    };

    return (
        <form onSubmit={stripePaymentSubmit} className={classes.root}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTION} />
                </div>
            </fieldset>
            <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Order Place"}
            </button>
        </form>
    );
};
