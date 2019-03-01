import React from 'react';
import classes from './node.module.css';

const Node = props => {

    const styles = [classes.node];
    if(props.selected){
        styles.push(classes.selected);
    }

    return(
        <div className={styles.join(" ")} onClick={props.click}>
            {props.name}
        </div>
    )
}

export default Node;