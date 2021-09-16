import React from 'react';
import "./CheckoutProduct.css";
import { useStateValue } from '../StateProvider';
import { Button } from '@material-ui/core'

function CheckoutProduct({ id, title, image, price, rating }) {

    const [{ cart }, dispatch] = useStateValue();
    const removeFromCart = (id) => {
        console.log('id', id)
        dispatch({
            type: "REMOVE_FROM_CART",
            id,
        });
    };
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={typeof image === 'object' ? '../../../../BackendApp/src/uploads/' + image[0].filename : image} alt="" />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                {rating ? (
                    <div className="checkoutProduct__rating">
                        {Array(rating)
                            .fill()
                            .map((_) => (
                                <p>&#11088;</p>
                            ))}
                    </div>) : null}
                <Button variant="contained" color="secondary" onClick={() => removeFromCart(id)}>Remove from Cart</Button>
            </div>
        </div>
    );
}

export default CheckoutProduct;
