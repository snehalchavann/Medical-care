import React, { Component } from "react";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import banner2 from './Images/banner2.jpg';
import groupon from './Images/groupon_promo.jpg';


export default class LabCarousel extends React.Component {
    render () {
        return (
            <Carousel autoPlay animation='slide'>
                <div>
                    <img src={banner2} alt = "lab1" style={{ width: "100%"}}/>
                </div>
                <div>
                    <img src={groupon} alt = "lab2" style={{ width: "100%"}}/>
                </div>
            </Carousel>
        )
    }
}

