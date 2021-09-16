
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import covid from '../images/covid (1).jpeg'

function ShowCategoryHome(props) {
//     // const [data] = useState(JSON.parse(localStorage.getItem('categoryData'), 'mmmmm'));
    
//     // const [data1] = data[2].children;
//     // console.log("datata>>",data1);
//     // return(
//     //     <div></div>
//     // )
//     const [data] = useState(JSON.parse(localStorage.getItem('categoryData')));
//     const path = props.history.location.pathname.split('/')[1];
//     const subDataList = data.find(obj => obj.name === path.split('_').join(' '));
//     // const [{ }, dispatch] = useStateValue();

//     // const selectProduct = (data) => {
//     //     dispatch({
//     //         type: "SELECTED_PRODUCT",
//     //         payload: data.data,
//     //     });
//     // };

//     const renderList = (item, index) => {
//         const formattedName = item.name.split(' ').join('_');
//         const navLink = `${path}/${formattedName}`;
//         return (
//             <a
//                 role="button"
//                 className="item-container"
//                 onClick={() => {
//                     selectProduct(item);
//                     localStorage.setItem('selectedProductCat', item.slug);
//                     props.history.push({
//                         pathname: navLink,
//                         state: { data: item }
//                     });
//                 }}
//                 key={index}
//             >
//                 <div className="item-inner-container">
//                     <img
//                         className="item-image"
//                         alt={item.name}
//                         src='https://cdn01.pharmeasy.in/dam/discovery/categoryImages/d560f1954c1a3200aba2ef4df2774d60'
//                         loading="lazy"
//                     />
//                     <noscript></noscript>
//                 </div>
//                 <div>
//                     <h5 className="item-name">{item.name}</h5>
//                 </div>
//             </a>
//         );
//     };
//     return (
//         <div>
            
//             <h2 className="checkout__title">{subDataList.name}</h2>
//             <div className="container">
//                 <div className="outer-item-container-main">
//                     {subDataList.children.length ? (<div className="list-container">
//                         {subDataList.children.map((item, index) => {
//                             return renderList(item, index);
//                         })}
//                     </div>) :
//                         <h5>Sorry no items to display</h5>}
//                 </div>
//             </div>
            
//         </div>
//     );
        
const [productData, setProductData] = useState([]);
    const [data] = useState(JSON.parse(localStorage.getItem('categoryData'), 'mmmmm'));
    console.log("datata>>",data)
    const slugVal = data[2].children;
    console.log("slug>>",slugVal)
 
    // useEffect(() => {
    //     axios.get(`http://localhost:2000/api/products/${slugVal}`).then((res) => {
    //         setProductData([...res.data.products]);
    //         console.log(res.data.products, 'products')
    //     })
    // }, [])

    const dataToShow = []
 
    for(let i = 0; i < 4; i++){
        dataToShow.push(slugVal[i])
    }
    if(!slugVal.length){
        return null
    }
    return(
        <div style={{margin:"5% 15%"}}>
            <h6 className="certi-title">Popular Categories</h6>
            <div className="flexing" >
                
            {dataToShow.map((lab) => (  
                        <Card className="lab-card" key={lab._id} variant="outlined" style={{margin: '15px',height:'800px!important'}}>
                        <CardContent>
                        <Typography >
                                <img src= {covid} style={{height:"2%"}}></img>
                            </Typography>
                            <Typography component="h6" className="lab-name">
                                {lab.name}
                            </Typography>
                            {/* <Typography color="textSecondary" className="certification">
                                {lab.certifiedLabs}
                            </Typography>
                            <Typography color="textSecondary" className="certification">
                                ${lab.price}
                            </Typography> */}
                        </CardContent>
                    </Card>
                    ))}
                    </div>
        </div>
     
        )
    


}

export default ShowCategoryHome;
