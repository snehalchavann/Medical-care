import React, { useRef, useEffect } from "react";
import "./checkout.css";
import { Paper } from '@material-ui/core';
export default function PayPal(props) {
    const paypal = useRef();
    console.log(props, 'props');
    const totalPrice = props.history.location.state.totalPrice;
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Medicine Order placed",
                                amount: {
                                    currency_code: "USD",
                                    value: totalPrice,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                    let pathName = window.location.pathname;
                        props.history.push({
                            pathname: `${pathName}`
                    });
                },
                onError: (err) => {
                    console.log(err);
                    alert("Unable to process the request, kindly try again");
                    console.log(order);
                    let pathName = window.location.pathname;
                        props.history.push({
                            pathname: `${pathName}checkout`
                    });
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div className='paymentMainContainer'>
            <Paper style={{ width: 500, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', boxShadow: '0px 1px 5px 0 rgba(0, 0, 0, 0.16)' }}>
                <div ref={paypal}></div>
            </Paper>
        </div>
    );
}