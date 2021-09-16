import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product(props) {
  const [{}, dispatch] = useStateValue();
  const addToCart = () => {
    //Add item to cart
    alert(`${props.title} added to the cart`);
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: props.id,
        title: props.title,
        image: props.image,
        price: props.price,
        rating: props.rating,
      },
    });
  };

  const removeFromCart = (item) => {
    alert(`${props.title} remove from the cart`);
    dispatch({
      type: "REMOVE_FROM_CART",
      id: item.id,
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{props.title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{props.price}</strong>
        </p>
      </div>

      <img src={props.image} alt="" />
      <div className="product__rating">
        {Array(props.rating)
          .fill()
          .map((_) => (
            <p>&#11088;</p>
          ))}
      </div>
      <button
        onClick={() => {
          addToCart(props);
        }}
      >
        Add to Cart
      </button>
      <button
        onClick={() => {
          removeFromCart(props);
        }}
      >
        Remove from Cart
      </button>
    </div>
  );
}

export default Product;
