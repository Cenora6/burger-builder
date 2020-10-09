import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {

    const controls = [
        { label: "Salad", type: 'salad'},
        { label: "Bacon", type: 'bacon'},
        { label: "Cheese", type: 'cheese'},
        { label: "Meat", type: 'meat'},
    ]

    return (
        <div className={classes.BuildControls}>
            {controls.map( (control) => {
                return <BuildControl
                    key={control.label}
                    label={control.label}
                    type={control.type}
                    more={() => props.more(control.type)}
                    less={() => props.less(control.type)}
                    disabled={props.disabled[control.type]}/>
            })}
        </div>
    );
};

export default buildControls;