import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from './../../UI/Button/Button';

const OrderSummary = props => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map( igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        })

    return (
        <Aux>
            <h3>Your order</h3>
            <p>Delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total price: {props.price.toFixed(2)} $</p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' click={props.close}>CANCEL</Button>
            <Button btnType='Success' click={props.continue}>CONTINUE</Button>
        </Aux>
    )
}

export default OrderSummary;