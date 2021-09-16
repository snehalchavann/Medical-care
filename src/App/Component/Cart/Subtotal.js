import React, { useState } from 'react'
import './Subtotal.css';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from '../StateProvider';
import { getCartTotal } from '../reducer';
import { Button } from '@material-ui/core'

function Subtotal(props) {
    const [{ cart }, dispatch] = useStateValue();
    return (
        <div className="subtotal">

            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({cart?.length} items) : <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift" style={{ fontSize: 16 }}>
                            <input type="checkbox" /> This order contains gift
                    </small>
                    </>
                )}
                decimalScale={2}
                value={getCartTotal(cart)}
                displayType={"text"}
                thousandSeperator={true}
                prefix={"$"}
            />
            <Button variant="contained" color="primary" onClick={() => {
                let pathName = window.location.pathname;
                pathName = '';
                props.history.push({
                    pathname: `${pathName}checkout`
                });
            }}>Proceed to Checkout</Button>
        </div>
    );
}

export default Subtotal;
