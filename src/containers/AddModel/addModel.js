import React, { Component } from 'react';
import Input from "../../components/Input/input"
import classes from './addModel.module.css';
import Title from '../../components/Title/title'

class AddModel extends Component{

    state = {
        inputs: {
            name: '',
            description: ''
        }
    }

    inputHandler = (event, id) => {

        const properties = {...this.state};

        switch(id){
            case 1:
                properties.inputs.name = event.target.value;
                break;
            case 2:
                properties.inputs.description = event.target.value;
                break;
        }
        this.setState({...properties});
    }

    render(){

        return(
            <>
                <form>
                    <div className="displayFlex">
                        <div className={classes.widthLeft}>
                            <Input value={this.state.name} onChange={(event) => {this.inputHandler(event, 1)}} name="Nombre" type="input" required/>
                            <Input value={this.state.description} onChange={(event) => {this.inputHandler(event, 2)}} name="Descripción" type="textarea"/>
                        </div>
                        <div className={[classes.widthRigth, classes.border].join(" ")}>
                            <Title title="Actividades"/>
                            <div className={classes.paddingInputs}>
                                <Input value={this.state.name} onChange={(event) => {this.inputHandler(event, 1)}} name="Nombre" type="input" required/>
                            </div>
                        </div>
                    </div>
                </form>
                <button type="button" onClick={this.props.closeModal}>Cerrar!</button>
            </>
        )
    }

}

export default AddModel;