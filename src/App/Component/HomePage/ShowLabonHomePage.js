import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import tests from '../LabTests/Images/blood-test.png';

function ShowLabonHomePage(props){
    const [productData, setProductData] = useState([]);
    const [data] = useState(JSON.parse(localStorage.getItem('categoryData'), 'mmmmm'));
    console.log("datata>>",data)
    const slugVal = data[1].slug
    console.log("slug>>",slugVal)

    useEffect(() => {
        axios.get(`http://localhost:2000/api/products/${slugVal}`).then((res) => {
            setProductData([...res.data.products]);
            console.log(res.data.products, 'products')
        })
    }, [])

    console.log(productData,'pro>>>>>>>>>>>>>')

    const dataToShow = []

    for(let i = 0; i < 4; i++){
        dataToShow.push(productData[i])
    }

    console.log(dataToShow,'pro')

    if(!productData.length){
        return null
    }
    return(
    <div style={{margin:"5% 15%"}}>
        <h6 className="certi-title">Popular Tests</h6>
        <div className="flexing">
        {dataToShow.map((lab) => (  
                    <Card key={lab._id} variant="outlined" style={{margin: '15px', border:"1px black solid"}} className="lab-card">
                    <CardContent>
                    <Typography >
                            <img src= {tests} style={{height:"15%"}}></img>
                        </Typography>
                        <Typography component="h6" className="lab-name">
                            {lab.name}
                        </Typography>
                        <Typography color="textSecondary" className="certification">
                            {lab.certifiedLabs}
                        </Typography>
                        <Typography color="textSecondary" className="certification">
                            ${lab.price}
                        </Typography>
                    </CardContent>
                </Card>
                ))}
                </div>
    </div>

    )
}

export default ShowLabonHomePage;