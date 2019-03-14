import React from 'react';
import classes from './input.module.css'

const input = props => {
    let input;
    switch(props.type){
        case 'input': 
            input = <input className={[classes.Input, classes.width100].join(" ")} {...props}/>
            break;
        case 'textarea': 
            input = <textarea className={[classes.Input, classes.width100].join(" ")} {...props}/>
            break;
        case 'select': 
            input = (<select className={[classes.Input, classes.width100].join(" ")} {...props} >
                        {props.options.map(i => <option value={i.value}>{i.name}</option>)}
                    </select>);
            break;
        default: 
            input = <input className={[classes.Input, classes.width100].join(" ")} {...props}/>
    }

    return(
        <div className={[classes.width100, classes.div, "displayFlex"].join(" ")} >
            <label className={[classes.width100, classes.Label].join(" ")}>{props.required ? <span className="redRequired">* </span> : null} {props.name}</label>
            {input}
        </div>
    );
}

export default input;