import React, { Component, useState } from "react";
import _ from "lodash";
import "./categories.css";
import NavbarHome from "../Header/NavbarHome";
import { useStateValue } from "./../StateProvider";
// import data from "./categories.json";
import MoreLabInfo from "../LabTests/MoreLabInfo";
import LabCarousel from '../LabTests/LabCarousel';
import Footer from '../Footer/Footer'

function SubCategories(props) {
    const [data] = useState(JSON.parse(localStorage.getItem('categoryData')));
    const path = props.history.location.pathname.split('/')[1];
    const subDataList = data.find(obj => obj.name === path.split('_').join(' '));
    const [{ }, dispatch] = useStateValue();

    const selectProduct = (data) => {
        dispatch({
            type: "SELECTED_PRODUCT",
            payload: data.data,
        });
    };

    const renderList = (item, index) => {
        const formattedName = item.name.split(' ').join('_');
        const navLink = `${path}/${formattedName}`;
        return (
            <a
                role="button"
                className="item-container"
                onClick={() => {
                    selectProduct(item);
                    localStorage.setItem('selectedProductCat', item.slug);
                    props.history.push({
                        pathname: navLink,
                        state: { data: item }
                    });
                }}
                key={index}
            >
                <div className="item-inner-container">
                    <img
                        className="item-image"
                        alt={item.name}
                        src='https://cdn01.pharmeasy.in/dam/discovery/categoryImages/d560f1954c1a3200aba2ef4df2774d60'
                        loading="lazy"
                    />
                    <noscript></noscript>
                </div>
                <div>
                    <h5 className="item-name">{item.name}</h5>
                </div>
            </a>
        );
    };
    return (
        <div>
            <NavbarHome />
            <LabCarousel categoryData={this?.state?.categoryData}></LabCarousel>
            <h2 className="checkout__title">{subDataList.name}</h2>
            <div className="container">
                <div className="outer-item-container-main">
                    {subDataList.children.length ? (<div className="list-container">
                        {subDataList.children.map((item, index) => {
                            return renderList(item, index);
                        })}
                    </div>) :
                        <h5>Sorry no items to display</h5>}
                </div>
            </div>
            <MoreLabInfo />
            <Footer />
        </div>
    );
}

export default SubCategories;
