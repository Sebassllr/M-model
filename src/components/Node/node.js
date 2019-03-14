import React from 'react';
import classes from './node.module.css';

const Node = props => {

    const styles = [classes.node];
    if(props.selected){
        styles.push(classes.selected);
    }

    return(
        <div onClick={event => { props.nodeClick(event, props.id) }} 
            className={styles.join(" ")}>
            {props.name}
        </div>
    )
}

export default Node;