import React, {useEffect, useState} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import axios from '../../axios/axios-orders';
import * as actions from '../../store/actions/index';

const BurgerBuilder = (props) => {

    const [purchasing, setPurchasing] = useState(false);
    const {fetchIngredients} = props;

    useEffect( () => {
        fetchIngredients();
    }, [fetchIngredients])

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce( (sum, el) => {
                return sum + el
            }, 0)

        return sum > 0;
    }

    const modalHandler = () => {
        if(props.isAuthenticated) {
            setPurchasing(!purchasing);
        } else {
            props.onSetRedirect('/checkout')
            props.history.push('/auth')
        }
    }

    const purchaseContinue = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...props.ings
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = props.err ? <p>Ingredients can't be loaded</p> : <Spinner/>
    if(props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings}/>
                <BuildControls
                    ingredients={props.ings}
                    more={props.moreIngredient}
                    less={props.lessIngredient}
                    disabled={disabledInfo}
                    price={props.price}
                    purchasable={updatePurchaseState(props.ings)}
                    clicked={modalHandler}
                    isAuth={props.isAuthenticated}/>
            </Aux>
        )
        orderSummary = <OrderSummary
            ingredients={props.ings}
            close={modalHandler}
            continue={purchaseContinue}
            price={props.price}/>
    }

    return (
        <Aux>
            <Modal show={purchasing} close={modalHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        err: state.burgerBuilder.error,
        isAuthenticated: state.auth.token != null

    }
}

const mapDispatchToProps = dispatch => {
    return {
        moreIngredient: (type) => dispatch(actions.addIngredients(type)),
        lessIngredient: (type) => dispatch(actions.removeIngredients(type)),
        fetchIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirect: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));