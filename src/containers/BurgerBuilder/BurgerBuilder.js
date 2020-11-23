import React, {useEffect, useState, useCallback} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useDispatch, useSelector} from "react-redux";
import axios from '../../axios/axios-orders';
import * as actions from '../../store/actions/index';

const BurgerBuilder = (props) => {

    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();

    const ings = useSelector( state => {
        return state.burgerBuilder.ingredients
    })

    const price = useSelector( state => {
        return state.burgerBuilder.totalPrice
    })

    const err = useSelector( state => {
        return state.burgerBuilder.error
    })

    const isAuthenticated = useSelector( state => {
        return state.auth.token != null
    })

    const moreIngredient = (type) => dispatch(actions.addIngredients(type));
    const lessIngredient= (type) => dispatch(actions.removeIngredients(type));
    const fetchIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetRedirect = (path) => dispatch(actions.setAuthRedirectPath(path));


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
        if(isAuthenticated) {
            setPurchasing(!purchasing);
        } else {
            onSetRedirect('/checkout')
            props.history.push('/auth')
        }
    }

    const purchaseContinue = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...ings
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = err ? <p>Ingredients can't be loaded</p> : <Spinner/>
    if(ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings}/>
                <BuildControls
                    ingredients={ings}
                    more={moreIngredient}
                    less={lessIngredient}
                    disabled={disabledInfo}
                    price={price}
                    purchasable={updatePurchaseState(ings)}
                    clicked={modalHandler}
                    isAuth={isAuthenticated}/>
            </Aux>
        )
        orderSummary = <OrderSummary
            ingredients={ings}
            close={modalHandler}
            continue={purchaseContinue}
            price={price}/>
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

export default withErrorHandler(BurgerBuilder, axios);