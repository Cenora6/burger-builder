import React from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

const BurgerIngredient = props => {

    let ingredients;

    switch ( props.type ) {
        case ('bread-bottom'):
            ingredients = <div className={classes.BreadBottom}></div>
            break;
        case ('bread-top'):
            ingredients = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            )
            break;
        case ('bacon'):
            ingredients = <div className={classes.Bacon}></div>
            break;
        case ('cheese'):
            ingredients = <div className={classes.Cheese}></div>
            break;
        case ('meat'):
            ingredients = <div className={classes.Meat}></div>
            break;
        case ('salad'):
            ingredients = <div className={classes.Salad}></div>
            break;
        default:
            ingredients = null;
    }

    return ingredients;
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;