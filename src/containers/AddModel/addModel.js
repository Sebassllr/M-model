import React, { Component } from 'react';
import Input from "../../components/Input/input"
import classes from './addModel.module.css';
import Title from '../../components/Title/title';
import axios from 'axios';

class AddModel extends Component{

    state = {
        inputs: {
            name: '',
            description: '',
            activities: [],
        },
        activity: {
            name: '',
            description: '',
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
            case 3:
                properties.activity.name = event.target.value;
                break;
            case 4:
                properties.activity.description = event.target.value;
                break;
        }
        this.setState({...properties});
    }

    addActivity = () => { 
        const props = {...this.state};
        const activity = {
            ...props.activity
        };
        const list = props.inputs.activities;
        list.push(activity);
        props.inputs.activities = list;
        props.activity.name = '';
        props.activity.description = '';
        this.setState(props);
    }

    saveModel = () => {
        axios.post('saveModel', this.state.inputs, { crossdomain: true }).then(response =>{
            this.props.closeModal();
        })
    }

    render(){
        const styles = {
            height: '282px'
        };
        return(
            <>
                <form>
                    <div className="displayFlex">
                        <div className={classes.widthLeft}>
                            <Input value={this.state.inputs.name} onChange={(event) => {this.inputHandler(event, 1)}} name="Nombre" type="input" required/>
                            <Input style={styles} value={this.state.description} onChange={(event) => {this.inputHandler(event, 2)}} name="Descripción" type="textarea"/>
                        </div>
                        <div className={[classes.widthRigth, classes.border].join(" ")}>
                            <Title title="Actividades"/>
                            <div className={classes.paddingInputs}>
                                <Input value={this.state.activity.name} onChange={(event) => {this.inputHandler(event, 3)}} name="Nombre" type="input" required/>
                                <Input value={this.state.activity.description} onChange={(event) => {this.inputHandler(event, 4)}} name="Descripción" type="textarea"/>
                                <button type="button" onClick={this.addActivity}>Agregar</button>
                            </div>
                        </div>
                    </div>
                </form>
                <button type="button" onClick={this.saveModel}>Guardar!</button>
            </>
        )
    }
}

export default AddModel;