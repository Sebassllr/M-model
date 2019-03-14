import React from 'react';
import Node from '../Node/node';
import classes from './list.module.css'

const List = props => {
    return(
        <div className={classes.list}>
            {props.list ? props.list.map(i => {
                return (<Node nodeClick={props.nodeClick} 
                    key={i._id} id={i._id} name={i.name} selected={i.selected} />)
            }) : null}
        </div>
    );
}

export default List;