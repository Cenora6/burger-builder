import * as actionTypes from './actionTypes';
import axios from './../../axios/axios-auth';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime) => {
    console.log(expirationTime)
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
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
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeOut(response.data.expiresIn))
                console.log(response.data)
            })
            .catch( error => {
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}