import React, { useState } from "react";
import { useStateValue } from "./../StateProvider";
import "./productDetails.css";
import NavbarHome from "../Header/NavbarHome";
import Footer from '../Footer/Footer'

function CheckoutToCart() {
  const [data] = useStateValue();
  const [{ }, dispatch] = useStateValue();

  const addToCart = (data) => {
    alert(`${data.name} added to the cart`);
    dispatch({
      type: "ADD_TO_CART",
      data,
    });
  };

  const removeFromCart = (item) => {
    alert(`${item.name} remove from the cart`);
    dispatch({
      type: "REMOVE_FROM_CART",
      id: item.id,
    });
  };

  let item = data.selectedItem;
  return (
    <div>
      <NavbarHome />
      <div className="checkout">
        <div className="checkout__left">
          <h2 className="checkout__title">Product Details</h2>
          <div className="checkoutProduct">
            <img
              className="imageProduct"
              src={item && item.image}
              alt=""
            />
            <div className="checkoutProduct__info">
              <p className="checkoutProduct__title">{item && item.name}</p>
              <p className="checkoutProduct__price">
                <small>$</small>
                <strong>{item && item.price}</strong>
              </p>
              <div className="product__rating">
                {Array(item.rating)
                  .fill()
                  .map((_) => (
                    <p>&#11088;</p>
                  ))}
              </div>
              {Object.keys(item).length > 0 && (
                <button
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  Add to Cart
                </button>
              )}
              {Object.keys(item).length > 0 && (
                <button
                  onClick={() => {
                    removeFromCart(item);
                  }}
                >
                  Remove from Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheckoutToCart;
