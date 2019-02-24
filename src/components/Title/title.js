import React from 'react';
import classes from './title.module.css'

const Title = props => {

    return(
        <div className={["width100", "displayFlex", classes.background].join(" ")}>
            {props.buttons}
            <span className={["marginAuto", classes.title].join(" ")}>{props.title}</span>
        </div>
    );

}

export default Title;