import React from 'react';
import classes from './title.module.css'

const Title = props => {
    console.log(props.buttons)
    return(
        <div className={["width100", "displayFlex", classes.background].join(" ")}>
            <span className={["marginAuto", classes.title].join(" ")}>{props.title}</span>
            <div>
                {props.buttons ? props.buttons.map(e => e) : null}
            </div>
        </div>
    );

}

export default Title;