// import React from 'react';
// import Carousel from 'react-bootstrap/Carousel'
// import carousel1 from '../images/c1.jpeg';
// export default class CarouselHome extends React.Component {
//     render() {
//         return (
//             <Carousel>
//                 <Carousel.Item>
//                     <img
//                         height="300px"
//                         className="d-block w-100"
//                         src={carousel1}
//                         alt="First slide"
//                     />
//                 </Carousel.Item>
//                 <Carousel.Item>
//                     <img
//                         className="d-block w-100"
//                         src="https://res.cloudinary.com/du8msdgbj/image/upload/w_960,h_200,,a_ignore,q_auto,f_auto/v1618811301/oyqgvbtuuf666lmkkt0j.png"
//                         alt="Second slide"
//                     />
//                 </Carousel.Item>
//                 <Carousel.Item>
//                     <img
//                         className="d-block w-100"
//                         src="https://res.cloudinary.com/du8msdgbj/image/upload/w_960,h_200,,a_ignore,q_auto,f_auto/v1618996508/a5ks2lgshvyi04owgy6a.png"
//                         alt="Third slide"
//                     />
//                 </Carousel.Item>
//             </Carousel>
//         )
//     }
// }

import React, { Component } from "react";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import homeCarousel1 from '../images/homeCarousel1.jpg';
import homeCarousel2 from '../images/homeCarousel2.jpg';


export default class CarouselHome extends React.Component {
    render() {
        return (
            <div style={{ textAlign: "center", marginTop: 40 }}>
                <Carousel autoPlay animation='slide'>
                    <div>
                        <img src={homeCarousel1} alt="lab1" />
                    </div>
                    <div>
                        <img src={homeCarousel2} alt="lab2" />
                    </div>
                </Carousel>
            </div>
        )
    }
}

