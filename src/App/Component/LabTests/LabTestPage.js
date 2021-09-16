import React, { useEffect, useState } from "react";
import ShowAllCerfitiedLabs from "./ShowAllCertifiedLabs";
import './lab.css';
import OptionsForTests from "./OptionsForTests";
import MoreLabInfo from "./MoreLabInfo";
import SearchAllTest from './SearchAllTest'
import PopularTests from "./PopularTests";
import LabCarousel from "./LabCarousel";
import NavbarHome from '../Header/NavbarHome';
import Footer from "../Footer/Footer";
import axios from "axios";

function LabTestPage(props){
    const [productData, setProductData] = useState([]);
    const [data] = useState(JSON.parse(localStorage.getItem('categoryData')));
    const path = props.history.location.pathname.split('/')[1];
    const slugValue = data.find(obj => obj.name === path.split('_').join(' ')).slug;
    console.log(slugValue, 'data');

    useEffect(() => {
        axios.get(`http://localhost:2000/api/products/${slugValue}`).then((res) => {
            setProductData([...res.data.products]);
            console.log(res.data.products, 'products')
        })
    }, [])

    console.log(productData,'>>>>>>>>>>>>>')

    if(!productData.length){
        return null
    }
    
    // render(){
        return(
            <div>
                <NavbarHome></NavbarHome>
            <div className="lab">
                <div>
                    <LabCarousel></LabCarousel>
                    <div>
                        {/* <SearchAllTest></SearchAllTest> */}
                    </div>
                    <div>
                        <OptionsForTests history={props.history} data={productData}></OptionsForTests>
                    </div>
                    <div>
                        <ShowAllCerfitiedLabs></ShowAllCerfitiedLabs>
                    </div>
                    <div>
                        <PopularTests history={props.history} data={productData}></PopularTests>
                    </div>
                    <MoreLabInfo></MoreLabInfo>
                </div>
            </div>
            <Footer/>
            </div>
        );
    // }
}

export default LabTestPage;