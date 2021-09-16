import { render } from 'less';
import React from 'react';
import NavbarHome from '../Header/NavbarHome';
import AllTestData from './AllTestData';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MoreLabInfo from "./MoreLabInfo";
import Footer from '../Footer/Footer'

function AllTestDetails({ history }) {

    const onClick = (test) => {
        console.log(history, 'rpops...')
        history.push({
            pathname: 'test',
            state: { data: test }
        })
    }

    //   const [data] = useStateValue();
    // const [{}, dispatch] = useStateValue();

    //   const addToCart = (test) => {
    //     alert(`${test.item_name} added to the cart`);
    //     dispatch({
    //       type: "ADD_TO_CART",
    //       test,
    //     });
    //   };
    return (
        <div>
            <NavbarHome />
            <div className="lab">
                <h3 className="certi-title test-header">Lab Tests</h3>
                <div className="flexing">
                    <div className="tests" >

                        {AllTestData.allTest.map((test) => (
                            <Card key={test.item_id} variant="outlined" style={{ margin: '15px' }} className="allTest-style">
                                <CardContent style={{ width: '68%' }}>
                                    <Typography component="h6">
                                        {test.item_name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {test.lab_availability}
                                    </Typography>
                                    <Typography variant="body2" component="p" style={{ marginTop: '20px' }}>
                                        $ {test.starting_price} onwards
                        </Typography>
                                    <Button size="small" className="moreDetails" onClick={() => onClick(test)}>+ More Details</Button>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" className="learnMore" >Add To Cart</Button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                    <div className="summary">

                        <h5>Order Summary</h5>
                        <hr></hr>

                        <Button size="small" className="summary-button" >View Cart</Button>
                    </div>
                </div>
                <MoreLabInfo></MoreLabInfo>

            </div>
            <Footer />
        </div>
    )
}

export default AllTestDetails;