import React from 'react';
import Node from '../Node/node';
import classes from './list.module.css'

const List = props => {
    return(
        <div className={classes.list}>
            {props.list ? props.list.map((i, index) => {
                return (<Node key={index} name={i.name} selected={props.selected} />)
            }) : null}
        </div>
    );
}

export default List;