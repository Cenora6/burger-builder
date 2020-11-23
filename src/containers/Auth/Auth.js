import React, {useCallback, useEffect, useState} from "react";
import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import classes from './Auth.module.css';
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import { updateObject } from "../../shared/utility";
import { checkValidity } from "../../shared/validation";
import Spinner from './../../components/UI/Spinner/Spinner';
import * as actions from './../../store/actions/index';

const Auth = () => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email',
                error: 'email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your Password',
                error: 'password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const [isSignUp, setIsSignUp] = useState(true);

    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const isAuthenticated = useSelector(state => state.auth.token != null);
    const buildingBurger = useSelector(state => state.burgerBuilder.building);
    const authRedirectPath = useSelector(state => state.auth.authRedirectPath);

    const dispatch = useDispatch();

    const onAuth = (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp));
    const onSetAuthRedirectPath = useCallback(() => dispatch(actions.setAuthRedirectPath('/')), [dispatch]);

    useEffect( () => {
        if(!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath()
        }
    }, [onSetAuthRedirectPath, buildingBurger, authRedirectPath])


    const inputChangedHandler = (event, controlName) => {
        const updatedAuthForm = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })
        })

        setAuthForm(updatedAuthForm);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        onAuth(authForm.email.value, authForm.password.value, isSignUp)
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    }


    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        })
    }

    let form = (formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(e) => inputChangedHandler(e, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                valueType={formElement.config.elementConfig.error}/>
        ))
    )

    if (loading) {
        form = <Spinner/>
    }

    let errorMessage;
    if(error) {
        if(error.message === "EMAIL_NOT_FOUND") {
            errorMessage = "This email doesn't exist in the base."
        } else if (error.message === "INVALID_PASSWORD" ||
            error.message === "MISSING_PASSWORD") {
            errorMessage = "The password is invalid."
        } else if (error.message === "USER_DISABLED") {
            errorMessage = "The user account has been disabled by an administrator."
        } else if (error.message === "EMAIL_EXISTS") {
            errorMessage = "The email address is already in use by another account."
        } else if (error.message === "INVALID_EMAIL") {
            errorMessage = "The email address is badly formatted."
        }
    }

    let authRedirect = null;
    if (isAuthenticated) {
        authRedirect = <Redirect to={authRedirectPath}/>
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            <p>{errorMessage}</p>
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success'>Submit</Button>
            </form>
            <Button btnType='Danger' click={switchAuthModeHandler}>
                Switch to {isSignUp ? "Signin" : "Signup"}
            </Button>
        </div>
    )
}

export default Auth;