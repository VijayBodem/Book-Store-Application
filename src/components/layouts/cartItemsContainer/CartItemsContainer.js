import React, {useContext} from 'react';
import "./cartItemsContainer.css";

import CartItemCard from '../../cards/cartItemCard/cartItemCard';
import { CartContext } from '../../../App';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';

const CartItemsContainer = () => {
const { cartItems, totalAmout } = useContext(CartContext);
const stripeKey = "pk_test_51NFw2VSAp6x3SV1O018qztSpRMlsy4ApDhEcigM9HaCU5iWTBEsOVnAKdmzABLgtClz8W0uPeP6YS6fVV1fxQLBh00JjbpE6Wf";
const navigate = useNavigate();
const onToken = (token) => {
        console.log(token);
        alert("Your Payment has been proceed..");
        navigate("/books")
}
    return (
        <section className='cart-items-container'>
           <div className='container'>
               {totalAmout === 0 ? (
                    <h2>Currently your Cart is Empty....</h2>
               ) : (
                    <React.Fragment> 
                                <h2>Cart</h2>
                        {cartItems.map((item) => (
                            <CartItemCard key={item.id} bookData={item} />

                        ))}

                        <h2>The Total Amout = &#8377;{totalAmout}</h2>
                        
                        
                        <StripeCheckout 
                            name="Book Checkout"
                            description='Please fill in the details below'
                            amount={totalAmout * 100}
                            currency='INR'
                            stripeKey={stripeKey}
                            token={onToken}
                            billingAddress
                        ><button className="button-primary button-width">Proceed to Checkout</button></StripeCheckout>
                </React.Fragment>
               )}
           </div>
                 
            
        </section>
    )
}

export default CartItemsContainer;