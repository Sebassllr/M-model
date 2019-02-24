import React from 'react'
import classes from './rightComponent.module.css'
import Title from '../Title/title'

const rightComponent = props => {

    return (
        <div className={classes.box}>
            <Title title="Detalles" />
        </div>
    );

}

export default rightComponent;