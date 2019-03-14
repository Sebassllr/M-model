import classes from './leftComponent.module.css';
import React from 'react';
import Title from '../Title/title';
import List from '../List/list';

const leftComponent = props => {
    
    const buttonList = [
        (<input onClick={props.addClick} className={[classes.add, classes.squareBtn].join(" ")} type="button" key="1"/>),
        (<input onClick={props.editClick} className={[classes.edit, classes.squareBtn].join(" ")} type="button" key="2"/>),
        (<input onClick={props.deleteClick} className={[classes.remove, classes.squareBtn].join(" ")} type="button" key="3"/>),
    ];

    return(
        <div className={classes.box}>
            <Title buttons={buttonList} title="Modelos" />
            <div className={classes.listHeight}>
                <List nodeClick={props.nodeClick} list={props.list}/>
            </div>
        </div>
    );
}

export default leftComponent;