import React, { Component, useState, useEffect } from "react";
import _ from "lodash";
import "./productList.css";
import Carousel from 'react-material-ui-carousel'
import NavbarHome from "../Header/NavbarHome";
import Dropdown from "react-dropdown";
import { useStateValue } from "./../StateProvider";
import "react-dropdown/style.css";
import axios from 'axios';
import { Button } from '@material-ui/core';
import MoreLabInfo from "../LabTests/MoreLabInfo";
import Footer from '../Footer/Footer'

const options = [
  { value: "lowtoHigh", label: "Price low to high" },
  { value: "highToLow", label: "Price high to low" },
  { value: "discount", label: "Discount" },
];

function ProductList(props) {
  const data = useStateValue();
  const [{ }, dispatch] = useStateValue();
  const path = props.history.location.pathname.split('/')[1];
  const slugValue = localStorage.getItem('selectedProductCat');
  // const slugValue = props.location.state.data.slug;
  const [selectedProduct, setSelectedProducts] = useState([]);
  useEffect(() => {
    console.log('effect');
    axios.get(`http://localhost:2000/api/products/${slugValue}`)
      .then((res) => {
        console.log(' prod ', res.data.products);
        setSelectedProducts([...res.data.products]);
      })
      .catch((err) => {
        alert(err);
      })
  }, []);
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
  const selectProduct = (data) => {
    dispatch({
      type: "SELECTED_PRODUCT",
      payload: data,
    });
  };
  const selectItem = (data) => {
    dispatch({
      type: "SELECTED_ITEM",
      payload: data,
    });
  };
  // let selectedProduct = data[0].selectedProduct;
  const renderList = (item, index) => {
    console.log(item, item.cutPrice, 'sad')
    return (
      <a
        onClick={() => { }}
        title="Baidyanath Sugarfree Chyawan Vit Health Food Jar Of 1 Kg"
        className="item-container"
        key={index}
      >
        <div className="item-upper-container">
          <div className="item-image-container">
            {/* <img className="item-image" src={item.image} loading="lazy" /> */}
            {item.files.length && (
              <Carousel autoPlay animation='slide'>
                {item.files.map((val) => (
                  <div>
                    <img src={'../../../../BackendApp/src/uploads/' + val.filename} className="item-SubImage" />
                  </div>
                ))}
              </Carousel>
            )}
          </div>
          <div className="item-lower-container">
            <a
              title="Baidyanath Sugarfree Chyawan Vit Health Food Jar Of 1 Kg"
              className="item-name"
            >
              {item.name}
            </a>
            <div className="item-mrp-container">
              <div className="item-mrp-price-container">
                <span className="">₹ {item.price}</span>
                {item.cutPrice && (
                  <span className="item-mrp-cut-price">
                    MRP <strike>₹ {item.cutPrice}</strike>
                  </span>
                )
                }
              </div>
              {item.off && (<div className="_3Q9DD">{item.off}% off</div>)}
            </div>
          </div>
        </div>
        <div className="button-item">
          <div className="hide">
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <Button
                  variant="contained" color="primary"
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  ADD TO CART
                </Button>


                {/* <button
                  className="addButton"
                  onClick={() => {
                    selectItem(item);
                    props.history.push("productDetails");
                  }}
                >
                  VIEW
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  };
  const filterProduct = (filter) => {
    if (selectedProduct.length > 0) {
      switch (filter.value) {
        case "lowtoHigh": {
          let sorted = selectedProduct.sort(
            (a, b) => parseFloat(a.price) - parseFloat(b.price)
          );
          return sorted;
        }
        case "highToLow": {
          let sortedhigh = selectedProduct.sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          );
          return sortedhigh;
        }
        case "discount":
          let discounted = selectedProduct.sort(
            (a, b) => parseFloat(a.off) - parseFloat(b.off)
          );
          return discounted;
      }
    }
  };
  return (
    <div>
      <NavbarHome />
      <h2 className="checkout__title">Product List</h2>
      {selectedProduct.length ? (
        <>
          <div className="dropdownOuterContainer">
            <div className="dropdown-container">
              <Dropdown
                options={options}
                onChange={(filter) => {
                  let data = filterProduct(filter);
                  if (data !== undefined) {
                    selectProduct(data);
                  }
                }}
                value={"Sort by"}
                placeholder="Select an option"
              />
            </div>
          </div>
          <div className="container">
            <div className="outer-item-container">
              <div className="inner-container">
                {selectedProduct.length > 0 &&
                  selectedProduct.map((item, index) => {
                    return renderList(item, index);
                  })}
              </div>
            </div>
          </div>
        </>
      ) : <div style={{ height: 160, textAlign: 'center' }}>No Product Available</div>}
      <MoreLabInfo />
      <Footer />
    </div>
  );
}

export default ProductList;
