import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actionTypes from './../../store/actions';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    // componentDidMount() {
    //     axios.get('ingredients.json')
    //         .then( response => {
    //             this.setState({
    //                 ingredients: response.data
    //             })
    //         })
    //         .catch( error => {
    //             this.setState({
    //                 error: true
    //             })
    //         })
    // }

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
        this.setState((prevState) => {
            return { purchasing: !prevState.purchasing }
        })
    }

    purchaseContinue = () => {
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
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
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
                        clicked={this.modalHandler}/>
                </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                close={this.modalHandler}
                continue={this.purchaseContinue}
                price={this.props.price}/>
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>;
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
        ings: state.ingredients,
        price: state.totalPrice,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        moreIngredient: (type) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: type}),
        lessIngredient: (type) => dispatch({type: actionTypes.DELETE_INGREDIENT, ingredientName: type}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));