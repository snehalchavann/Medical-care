import React, { useState, useEffect } from 'react'
import { useStateValue } from '../StateProvider';
import './CheckoutToCart.css';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';
import NavbarHome from '../Header/NavbarHome';
import Footer from '../Footer/Footer'

function CheckoutToCart(props) {
    let [{ cart }, dispatch] = useStateValue();
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cartData'))
        if (!cart.length && data.length) {
            dispatch({
                type: "SET_DATA",
                payload: data,
            });
        }
    }, [])
    return (
        <>
            <NavbarHome />
            <div className="checkout">
                <div className="checkout__left">
                    <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                        alt=""
                    />
                    {cart?.length === 0 ? (
                        <div style={{ height: 210 }}>
                            <h2>Your cart is empty</h2>
                        </div>
                    ) : (
                        <div>
                            <h2 className="checkout__title">Your shopping cart</h2>
                            {cart.map(item => (
                                <CheckoutProduct
                                    title={item.name || item.item_name}
                                    image={item.image || item.files}
                                    price={item.price || item.starting_price}
                                    rating={item.rating || ''}
                                    id={item._id}
                                />
                            ))}

                        </div>
                    )}
                </div>
                {cart.length > 0 && (
                    <div className="checkout__right">
                        <Subtotal {...props} />
                    </div>
                )}

            </div>
            <Footer />
        </>
    );
}

export default CheckoutToCart;

