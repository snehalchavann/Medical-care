import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import "./checkout.css";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import cod from '../../cod.png';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useStateValue } from '../StateProvider';
import { getCartTotal } from '../reducer';
// modal
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AddressForm from './AddressForm';
import NavbarHome from '../Header/NavbarHome';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Checkout(props) {
    const [{ cart }, dispatch] = useStateValue();
    // console.log(JSON.parse(localStorage.getItem('userDetails'), 'JSON.parse(localStorage.getItem('userDetails'))
    if (!localStorage.getItem('userDetails')) {
        props.history.push('login');
        return null;
    }
    const address = localStorage.getItem('address') && JSON.parse(localStorage.getItem('address'));
    console.log(address, 'addresss');
    const [initialState, setInitialState] = useState(address);
    const totalPrice = getCartTotal(cart);
    const [shippingCost, setShippingCost] = useState(Number(4));
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = useState('a');
    const [makePayment, setMakePayment] = useState(false);
    const [paymentOption, setPaymentOption] = useState('paypal');
    const [isAddress, setIsAddress] = useState(initialState.addLine1 ? true : false);
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [cost, setCost] = useState(8 + shippingCost + totalPrice);
    const handlePaymentChange = ({ target }) => {
        // setPaymentOption(target.value);
        if (target.value === 'paypal') {
            setPaymentOption('paypal');
        } else {
            setPaymentOption('cod');
        }
    };
    console.log(localStorage.getItem('token'), 'token')
    useEffect(() => {
        axios.post('http://localhost:2000/api/user/getaddress', {},  {
            headers: {
                'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
            }
        }).then((res) => {
            console.log(res, 'res');
        })
    }, []);
    const handleClickOpen = (edit) => {
        setOpen(true);
        setIsEdit(edit)
    };

    const handleClose = () => {
        setOpen(false);
        setIsEdit(false);
    };

    const handleChange = ({ target }) => {
        setSelectedValue(target.value);
        if (target.value === 'a') {
            setShippingCost(Number(4));
            setCost(8 + totalPrice + 4);
        } else {
            setShippingCost(Number(8));
            setCost(8 + totalPrice + 8);
        }
    }
    const handlePayment = () => {
        if (!isAddress) {
            setMakePayment(false);
            alert('Please add an address to be shipped to');
            return;
        }
        if (paymentOption === 'cod') {
            alert('Congratualtions your order has been placed');
            localStorage
            let pathName = window.location.pathname;
            props.history.push({
                pathname: `${pathName}`,
                state: { totalPrice: cost }
            });
            return;
        }
        // setMakePayment(true);
        let pathName = window.location.pathname;
        props.history.push({
            pathname: `${pathName}payment`,
            state: { totalPrice: cost }
        });
    }
    const modal = () => {
        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Shipping Address"}</DialogTitle>
                <DialogContent>
                    <AddressForm initialState={initialState} isEdit={isEdit} setOpen={setOpen} setIsAddress={setIsAddress} setInitialState={setInitialState}/>
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <div className={classes.root}>
            <NavbarHome></NavbarHome>
            <div className='breadcrumbs'>
                <span>{'Cart'}</span>
                <span> {'< Place Order '}</span>
                <span>{'< Pay'}</span>
                <span>{'< Order complete'}</span>
            </div>
            <Grid container spacing={3} className='parentGrid'>
                <Grid item xs={8} className={`leftShipping bottomShipping displayGrid`}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} className="check-title clearfix">
                            <h4>Shipping Address</h4>
                            <i className="iconfont icon-close address-select-close she-fr j-address-close" style={{ display: 'none' }}></i>
                        </Grid>
                        {isAddress && (<Grid item xs={6} className={`leftShipping bottomShipping`} className={'addressItem'}>
                            <div className='name-phone'>
                                <p className={'name'}>{`${initialState.fName} ${initialState.lName}`}</p>
                                <div className={'phone'}>{initialState.phone}</div>
                            </div>
                            <p>{initialState.addLine1}</p>
                            <p>{initialState.addLine2}</p>
                            <p>{initialState.city} {initialState.state}</p>
                            <p>{initialState.country} {initialState.zipcode}</p>
                            <div tabindex="0" className="default">{'default Address'}</div>
                            <div className="operate"><a href="javascript:;" onClick={() => handleClickOpen(true)}>
                                {'edit'}
                            </a>
                                <div tclassName="no-national" style={{ display: 'none' }}>
                                    Incomplete address. Please complete your address for better delivery.
                                </div>
                            </div>
                        </Grid>)}
                        {!isAddress && (<Grid item xs={6} className={`addAddressGrid`}>
                            <Grid item xs={12} className="addAddressDiv">
                                <a href="javascript:;" className="she-btn-white j-add-address" onClick={() => handleClickOpen(false)}>+Add New Address</a>
                            </Grid>
                        </Grid>)
                        }
                        <Grid item xs={12} className="check-title clearfix">
                            <h4>Choose your shipping options</h4>
                            <i className="iconfont icon-close address-select-close she-fr j-address-close" style={{ display: 'none' }}></i>
                        </Grid>
                        <Grid item xs={12} className="check-title clearfix" style={{ padding: 0 }}>
                            <Card style={{ marginBottom: 20 }}>
                                <CardContent>
                                    <Radio
                                        checked={selectedValue === 'a'}
                                        onChange={handleChange}
                                        value="a"
                                        style={{ float: 'left', clear: 'both' }}
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'A' }}
                                    />
                                    <div className={'option-description'}>
                                        <p className='marginStyle fontSizeStyle'>
                                            <span>Standard Shipping</span>
                                        </p>
                                        <p className='marginStyle fontSizeStyle'>
                                            <span>US$4 </span>
                                            <span> Orders placed now are expected to arrive 5 days from today </span>
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card style={{ marginBottom: 20 }}>
                                <CardContent>
                                    <Radio
                                        checked={selectedValue === 'b'}
                                        onChange={handleChange}
                                        value="b"
                                        style={{ float: 'left', clear: 'both' }}
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'B' }}
                                    />
                                    <div className={'option-description'}>
                                        <p className='marginStyle fontSizeStyle'>
                                            <span>Express Shipping</span>
                                        </p>
                                        <p className='marginStyle fontSizeStyle'>
                                            <span>US$8 </span>
                                            <span> Orders placed now are expected to arrive 2 days from today </span>
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} className="check-title clearfix">
                            <h4>Payment Options</h4>
                            <i className="iconfont icon-close address-select-close she-fr j-address-close" style={{ display: 'none' }}></i>
                        </Grid>
                        <div className={'payment-list'}>
                            <div style={{ marginBottom: 20 }}>
                                <Radio
                                    checked={paymentOption === 'paypal'}
                                    onChange={handlePaymentChange}
                                    value="paypal"
                                    style={{ float: 'left', clear: 'both' }}
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'paypal' }}
                                />
                                <div className={'option-description'}>
                                    <img src="//img.ltwebstatic.com/images2_pi/2018/06/06/15282719811871317559.png" className="payment-src" width='50px' style={{ float: 'left', clear: 'both' }}></img>
                                    <p className='marginStyle' style={{ float: 'right', marginTop: 3, paddingLeft: 20, fontSize: 20 }}>
                                        <span>PayPal</span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Radio
                                    checked={paymentOption === 'cod'}
                                    onChange={handlePaymentChange}
                                    value="cod"
                                    style={{ float: 'left', clear: 'both' }}
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'cod' }}
                                />
                                <div className={'option-description'}>
                                    <img src={cod} class="payment-src" width='50px' style={{ float: 'left', clear: 'both' }}></img>
                                    <p className='marginStyle' style={{ float: 'right', marginTop: 3, paddingLeft: 20, fontSize: 20 }}>
                                        <span>Cash On Delivery</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid item xs={12} className="check-title clearfix">
                        <h4>Order Summary</h4>
                        <i class="iconfont icon-close address-select-close she-fr j-address-close" style={{ display: 'none' }}></i>
                    </Grid>
                    <Grid item xs={12} className='fontSizeStyle' style={{ height: '20%' }}>
                        <div>
                            <p className={'leftFloatStyle marginStyle'}>Retail Price </p>
                            <p className={'rightFloatStyle marginStyle'}>US${totalPrice}.00</p>
                            <p className={'leftFloatStyle marginStyle'}>Subtotal </p>
                            <p className={'rightFloatStyle marginStyle'}>US${totalPrice}.00</p>
                            <p className={'leftFloatStyle marginStyle'}>Shipping fee </p>
                            <p className={'rightFloatStyle marginStyle'}>US${shippingCost}.00</p>
                            <p className={'leftFloatStyle marginStyle'}>Shipping Guarantee </p>
                            <p className={'rightFloatStyle marginStyle'}>US$8.00</p>
                            <p className={'leftFloatStyle marginStyle'}>Grand Total </p>
                            <p className={'rightFloatStyle marginStyle'}>US${cost}.00</p>
                        </div>

                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" className={'buttonStyle'} onClick={handlePayment}>
                            Place Order
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            {open && modal()}
        </div>
    );
}
