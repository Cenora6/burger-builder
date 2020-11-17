import { put, delay, call } from 'redux-saga/effects';
import * as actions from './../actions/index';
import axios from "../../axios/axios-auth";

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield call([localStorage, 'removeItem'], "userId");
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeOutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url;
    let API_KEY = 'AIzaSyCJur5agqGFAZlHmxt192UwS5twYMDvrZw'
    action.isSignUp ? url = `accounts:signUp?key=${API_KEY}` : url = `accounts:signInWithPassword?key=${API_KEY}`

    try {
        const response = yield axios.post(url, authData)

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);

        yield call([localStorage, 'setItem'], "token", response.data.idToken);
        yield call([localStorage, 'setItem'], "expirationDate", expirationDate);
        yield call([localStorage, 'setItem'], "userId", response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeOut(response.data.expiresIn))
    } catch (error) {
        yield put(actions.authFail(error.response.data.error))
    }
}

export function* authCheckStateSaga(action) {
    const token = yield call([localStorage, 'getItem'], "token");
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield call([localStorage, 'getItem'], "userId");
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000 ));
        }
    }
}