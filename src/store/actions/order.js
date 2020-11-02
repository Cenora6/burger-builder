import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';

export const purchaseBurgerSuccess = (id, data) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: data
    }

}
export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (data) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', data)
            .then( response => {
                dispatch(purchaseBurgerSuccess(response.data.name, data));
            })
            .catch( error => {
                dispatch(purchaseBurgerFail(error));
            })

    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}