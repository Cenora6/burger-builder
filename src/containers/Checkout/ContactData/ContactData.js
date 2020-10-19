import React, {Component} from "react";
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from './../../../axios-orders';
import Spinner from './../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        console.log(this.props.ingredients)

        this.setState({
            loading: true,
        })

        const order = {
            ingredients: this.state.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then( response => {
                this.setState({
                    loading: false
                })
                this.props.history.push('/')
            })
            .catch( error => {
                this.setState({
                    loading: false
                })
            })


    }

    render() {

        let form = (
            <form>
                <input className={classes.Input} type='text' name="name" placeholder='Your name'/>
                <input className={classes.Input} type='email' name="email" placeholder='Your email'/>
                <input className={classes.Input} type='text' name="street" placeholder='Your street'/>
                <input className={classes.Input} type='text' name="postalCode" placeholder='Your postal code'/>
                <Button btnType='Success' click={this.orderHandler}>ORDER</Button>
            </form>
        )

        if(this.state.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;