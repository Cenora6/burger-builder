import React, { Component } from 'react';
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

export class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.fetchIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce( (sum, el) => {
                return sum + el
            }, 0)

        return sum > 0;
    }

    modalHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState((prevState) => {
                return { purchasing: !prevState.purchasing }
            })
        } else {
            this.props.onSetRedirect('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseContinue = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.err ? <p>Ingredients can't be loaded</p> : <Spinner/>
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredients={this.props.ings}
                        more={this.props.moreIngredient}
                        less={this.props.lessIngredient}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        clicked={this.modalHandler}
                        isAuth={this.props.isAuthenticated}/>
                </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                close={this.modalHandler}
                continue={this.purchaseContinue}
                price={this.props.price}/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} close={this.modalHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
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