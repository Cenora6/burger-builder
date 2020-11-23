import React from "react";
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import {useSelector} from "react-redux";

const Checkout = props => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    const ings = useSelector(state => state.burgerBuilder.ingredients)
    const purchased = useSelector(state => state.order.purchased)

    let summary = <Redirect to='/'/>
    if (ings) {
        const purchasedRedirect = purchased ? <Redirect to='/'/> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}/>
                <Route path={props.match.path + '/contact-data'}
                       component={ContactData}/>
            </div>
        )
    }
    return (
        <div>
            {summary}
        </div>
    )
}

export default Checkout;