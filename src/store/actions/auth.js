import * as actionTypes from './actionTypes';
import axios from './../../axios/axios-auth';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url;
        let API_KEY = 'AIzaSyCJur5agqGFAZlHmxt192UwS5twYMDvrZw'
        isSignUp ? url = `accounts:signUp?key=${API_KEY}` : url = `accounts:signInWithPassword?key=${API_KEY}`

        axios.post(url, authData)
            .then( response => {
                dispatch(authSuccess(response.data))
                console.log(response.data)
            })
            .catch( error => {
                dispatch(authFail(error))
            })
    }
}