import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentStripe } from './PaymentStripe';

const PUBLIC_KEY = "pk_test_L4U4E3Uf9lK8x1D4kBhKigri"; // Test Publish Key

const stripePublicKey = loadStripe(PUBLIC_KEY) 

export const StripeContainer = ({amount, validationCheck, orderComplete, cartItems, customer, shippingAddress}) => {
   
  return (
    <Elements stripe={stripePublicKey} >
        <PaymentStripe amount={amount} validation={validationCheck} orderComplete={orderComplete} cartItems={cartItems} customer={customer} shippingAddress={shippingAddress} />
        {/* <SplitForm amount={amount} validation={validationCheck} orderComplete={orderComplete} /> */}
    </Elements>
  )
}
