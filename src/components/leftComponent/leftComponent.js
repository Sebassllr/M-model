import classes from './leftComponent.module.css';
import React from 'react';
import Title from '../Title/title'

const leftComponent = () => {
    return(
        
        <div className={classes.box}>
            <Title title="Modulos" />
            <input type="button" />
        </div>
    );
}

export default leftComponent;