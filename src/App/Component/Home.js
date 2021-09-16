import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import CarouselHome from "./CarouselHome";
import LabCarousel from './LabTests/LabCarousel';
import _ from "lodash";
import { styles } from "./styles";
import axios from "axios";
import Dropdown from "react-dropdown";
// import axios from 'axios';
import "./home.css";
import NavbarHome from "./Header/NavbarHome";
import Product from "./Product";
import data from "./homeData.json";
import MoreInfoOnUs from "./HomePage/MoreInfoOnUs";
import Footer from "./Footer/Footer";
import SubCategories from "./Category/SubCategories";
import ShowCategoryHome from "./ShowCategoryHome";
import ShowLabonHomePage from "./HomePage/ShowLabonHomePage";

const options = [
  { value: "lowtoHigh", label: "Price low to high" },
  { value: "highToLow", label: "Price high to low" },
  { value: "discount", label: "Discount" },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: [],
      data: data,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:2000/api/category/getCategory')
        .then((res) => {
          this.setState({
            categoryData: res.data.categoryList
          });
          localStorage.setItem('categoryData', JSON.stringify(res.data.categoryList));
        })
        .catch((err) => {
          alert(err);
        })
  }
  
  filterProduct(filter) {
    if (data.length > 0) {
      switch (filter.value) {
        case "lowtoHigh": {
          let sorted = data.sort(
            (a, b) => parseFloat(a.price) - parseFloat(b.price)
          );
          return sorted;
        }
        case "highToLow": {
          let sortedhigh = data.sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          );
          return sortedhigh;
        }
        case "discount":
          let discounted = data.sort(
            (a, b) => parseFloat(a.off) - parseFloat(b.off)
          );
          return discounted;
      }
    }
  }

  render() {
    const { classNamees } = this.props;
    
    if (!localStorage.getItem('categoryData')) {
      return null;
    }
    
    return (
      <div>
        <NavbarHome categoryData={this?.state?.categoryData}></NavbarHome>
        <CarouselHome categoryData={this?.state?.categoryData}></CarouselHome>
        <ShowCategoryHome categoryData={this?.state?.categoryData}></ShowCategoryHome>
        <ShowLabonHomePage categoryData={this?.state?.categoryData}></ShowLabonHomePage>
        <MoreInfoOnUs></MoreInfoOnUs>
        

        <div className="home">
          
          {/* <img className="home__image" 
            src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2020/X-site/Multititle/Aug/1500x600_Hero-Tall_np._CB404803728_.jpg" 
            alt="banner image"
            /> */}
          {/* <div className="dropdownOuterContainer">
            <div className="dropdown-container">
              <Dropdown
                options={options}
                onChange={(filter) => {
                  let data = this.filterProduct(filter);
                  if (data !== undefined) {
                    this.setState({
                      data,
                    });
                  }
                }}
                value={"Sort by"}
                placeholder="Select an option"
              />
            </div>
          </div> */}
          {/* <div className="home__row">
            {this.state.data.map((item) => {
              return (
                <Product
                  id={item.id}
                  title={item.name}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              );
            })}
          </div> */}
        </div>
        {/* <SubCategories /> */}
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
