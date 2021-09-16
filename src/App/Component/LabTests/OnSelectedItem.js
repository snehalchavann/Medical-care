import { render } from 'less';
import React from 'react';
import NavbarHome from '../Header/NavbarHome';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MoreLabInfo from "./MoreLabInfo";
import { useStateValue } from "./../StateProvider";

function OnSelectedItem(props) {
    console.log("props>>>>>>>>>>>>", props)
    let data = props?.history?.location?.state?.data;
    if (!data) {
        data = JSON.parse(localStorage.getItem('selectedTest'))
    }
    const eachTest = []
    for (let i = 0; i < data.includedTests.length; i++) {
        console.log("test>", data.includedTests[i].name)
        eachTest.push(data.includedTests[i].name)
    }
    console.log("size>", eachTest.length)

    const listItems = eachTest.map((t) =>
        <li>{t}</li>
    );

    const [{ }, dispatch] = useStateValue();

    const addToCart = (data) => {
        alert(`${data.name} added to the cart`);
        dispatch({
            type: "ADD_TO_CART",
            data,
        });
    };


    const item = data;

    return (
        <div>
            <NavbarHome />
            <div className="lab">
                <h3 className="certi-title test-header">Lab Details</h3>
                <div className="flexing">
                    <div className="each-test">
                        <div >
                            <Card variant="outlined" style={{ margin: '15px' }}>
                                <CardContent style={{ width: '95%' }}>
                                    <Typography component="h2" style={{ fontSize: '1.4rem' }}>
                                        {data.name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        ${data.price}
                                        <Button size="small" variant="contained" style={{ float: 'right' }} onClick={() => {
                                            addToCart(data);
                                        }}>Add To Cart</Button>
                                    </Typography>
                                    {/* <Typography variant="body2" component="p" style={{ marginTop: '20px' }}>
                                        {data.lab_availability}
                                    </Typography> */}
                                    {/* {listItems && listItems.length ? (
                                        <Typography>
                                            <ul>{listItems}</ul>
                                        </Typography>
                                    ) : null} */}
                                    <div className="desc">
                                        <h5 className="desc-title">Description</h5>
                                        <hr className="desc-title"></hr>
                                        <p className="descrip">
                                            Antenatal testing describes procedures performed during pregnancy to detect health problems in the growing fetus; establish characteristics such as fetal age, sex, or weight; or diagnose any material conditions that may affect fetal development.
                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="summary">
                    </div>
                </div>
                <MoreLabInfo />
            </div>
        </div>
    )
}

export default OnSelectedItem;