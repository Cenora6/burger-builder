import React, {useEffect, useState} from "react";
import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import classes from './Auth.module.css';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import { updateObject } from "../../shared/utility";
import { checkValidity } from "../../shared/validation";
import Spinner from './../../components/UI/Spinner/Spinner';
import * as actions from './../../store/actions/index';

const Auth = (props) => {
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
    const {onSetAuthRedirectPath, buildingBurger, authRedirectPath} = props;

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
        props.onAuth(authForm.email.value, authForm.password.value, isSignUp)
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

    if (props.loading) {
        form = <Spinner/>
    }

    let errorMessage;
    if(props.error) {
        if(props.error.message === "EMAIL_NOT_FOUND") {
            errorMessage = "This email doesn't exist in the base."
        } else if (props.error.message === "INVALID_PASSWORD" ||
            props.error.message === "MISSING_PASSWORD") {
            errorMessage = "The password is invalid."
        } else if (props.error.message === "USER_DISABLED") {
            errorMessage = "The user account has been disabled by an administrator."
        } else if (props.error.message === "EMAIL_EXISTS") {
            errorMessage = "The email address is already in use by another account."
        } else if (props.error.message === "INVALID_EMAIL") {
            errorMessage = "The email address is badly formatted."
        }
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath}/>
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

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);