import React, { Component } from 'react';
import classes from './addChildren.module.css';
import Title from '../../components/Title/title';
import List from '../../components/List/list';

class AddChildren extends Component{

    state = {
        currentChildre: [],
        newChildren: [],
    }

    render(){
        const titleStyle = {
            height: '31px',
            fontSize: '12px',
            backgroundColor: '#cccccc8a'
        };
        return(
            <div className={[classes.height100, classes.fullContainer].join(" ")}>
                <div className={["displayFlex", classes.laneContainer].join(" ")}>
                    <div className={[classes.lane].join(" ")}>
                        <Title title={"Por Agregar"} titleStyle={titleStyle} />
                        <div>
                            <List />
                        </div>
                    </div>
                    <div className={[classes.buttonContainer].join(" ")}>
                        <button 
                            type="button" 
                            className={classes.addButton} 
                            onClick={this.addAsChildren}>
                        </button>
                        <button 
                            type="button" 
                            className={[classes.addButton, classes.removeButton].join(" ")} 
                            onClick={this.removeChild}>
                        </button>
                    </div>
                    <div className={[classes.lane].join(" ")}>
                        <Title title={"Agregados"} titleStyle={titleStyle} />
                        <div>
                            <List />
                        </div>
                    </div>
                </div>
                <div className={classes.bottomButtons}>
                    <button className={classes.btnCancel} type="button">Cancelar</button>
                    <button className={classes.btnSave} type="button">Guardar</button>
                </div>
            </div>
        )
    }
}

export default AddChildren;