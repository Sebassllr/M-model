import React from 'react'
import classes from './rightComponent.module.css'
import Title from '../Title/title'

const rightComponent = props => {

    return (
        <div className={classes.box}>
            <Title title="Detalles" />
            <div className={classes.marginTitles}>
                <span className={classes.title}>Nombre: </span> 
                <span>{props.name}</span>
            </div>
            <div className={classes.marginTitles}>
                <span className={classes.title}>Descripción: </span>
                <span>{props.description}</span>
            </div>
            <div className={[classes.title, classes.marginTitles].join(" ")}>Actividades </div>
            <ol className={classes.List}>
                {props.activities ? props.activities.map(i => <li onClick={(event) => {
                    props.showPopUp(i._id);
                }} key={i._id}>{i.name}</li> ) : null}
            </ol>
        </div>
    );

}

export default rightComponent;