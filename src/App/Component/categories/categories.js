import React, { Component } from "react";
import _ from "lodash";
import "./categories.css";
import NavbarHome from "../Header/NavbarHome";
import { useStateValue } from "./../StateProvider";
import data from "./categories.json";
import Footer from '../Footer/Footer'

function Categories(props) {
  const [{ }, dispatch] = useStateValue();

  const selectProduct = (data) => {
    dispatch({
      type: "SELECTED_PRODUCT",
      payload: data.data,
    });
  };

  const renderList = (item, index) => {
    return (
      <a
        role="button"
        className="item-container"
        onClick={() => {
          selectProduct(item);
          props.history.push("productList");
        }}
        key={index}
      >
        <div className="item-inner-container">
          <img
            className="item-image"
            alt="Nutrition"
            src={item.image}
            loading="lazy"
          />
          <noscript></noscript>
        </div>
        <div className="item-inner">
          <h5 className="item-name">{item.name}</h5>
          <div className="item-off">{item.off}% off</div>
        </div>
      </a>
    );
  };
  return (
    <div>
      <NavbarHome />
      <h2 className="checkout__title">Categories</h2>
      <div className="container">
        <div className="outer-item-container-main">
          <div className="list-container">
            {data.map((item, index) => {
              return renderList(item, index);
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Categories;
