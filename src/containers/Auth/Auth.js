import React, {Component} from "react";
import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import classes from './Auth.module.css';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import Spinner from './../../components/UI/Spinner/Spinner';
import * as actions from './../../store/actions/index';

class Auth extends Component {
    state = {
        authForm: {
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
            },
        },
        isSignUp: true
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedAuthForm = {
            ...this.state.authForm,
            [controlName]: {
                ...this.state.authForm[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.authForm[controlName].validation),
                touched: true
            }
        }
        this.setState({
            authForm: updatedAuthForm
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            })
        }

        let form = (formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(e) => this.inputChangedHandler(e, formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    valueType={formElement.config.elementConfig.error}/>
            ))
        )

        if (this.props.loading) {
            form = <Spinner/>
        }

        let errorMessage;
        if(this.props.error) {
            console.log(this.props.error.message)
            if(this.props.error.message === "EMAIL_NOT_FOUND") {
                errorMessage = "This email doesn't exist in the base."
            } else if (this.props.error.message === "INVALID_PASSWORD" ||
            this.props.error.message === "MISSING_PASSWORD") {
                errorMessage = "The password is invalid."
            } else if (this.props.error.message === "USER_DISABLED") {
                errorMessage = "The user account has been disabled by an administrator."
            } else if (this.props.error.message === "EMAIL_EXISTS") {
                errorMessage = "The email address is already in use by another account."
            } else if (this.props.error.message === "INVALID_EMAIL") {
                errorMessage = "The email address is badly formatted."
            }
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to='/'/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <p>{errorMessage}</p>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Submit</Button>
                </form>
                <Button btnType='Danger' click={this.switchAuthModeHandler}>
                    Switch to {this.state.isSignUp ? "Signin" : "Signup"}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);