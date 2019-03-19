import React, { Component } from 'react';
import Input from "../../components/Input/input"
import classes from './addModel.module.css';
import Title from '../../components/Title/title';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';

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
            objective: '',
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
            case 5:
                properties.activity.objective = event.target.value;
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
        props.activity.objective = '';
        this.setState(props);
    }

    saveModel = async () => {
        console.log(this.state.inputs);
        const toSendItem = {...this.state.inputs };
        await axios.post('saveModel', toSendItem).then(response =>{
            this.props.closeModal();
            NotificationManager.success('Se ha guardado correctamente', 'Guardado');
        });
    }

    render(){
        const styles = {
            height: '282px'
        };

        const titleStyle = {
            height: '35px'
        };

        const inputDescStyle = {
            width: 'calc(50% - 5px)',
            margin: '5px 10px'
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
                            <Title titleStyle={titleStyle} title="Actividades"/>
                            <div className={classes.paddingInputs}>
                                <Input value={this.state.activity.name} onChange={(event) => {this.inputHandler(event, 3)}} name="Nombre" type="input" required/>
                                <div className={'displayFlex'}>
                                    <div style={inputDescStyle} >
                                        <Input 
                                            value={this.state.activity.description} 
                                            onChange={ event => {this.inputHandler(event, 4)} } 
                                            name="Descripción" 
                                            type="textarea"/>
                                    </div>
                                
                                    <div style={inputDescStyle}>
                                        <Input  
                                            value={this.state.activity.objective} 
                                            onChange={event => { this.inputHandler(event, 5)} } 
                                            name="Objetivo" 
                                            type="textarea"/>
                                    </div>
                                </div>
                                <button type="button" onClick={this.addActivity}>Agregar</button>
                            </div>
                        </div>
                    </div>
                </form>
                <button type="button" onClick={this.saveModel}>Guardar</button>
                <button type="button" onClick={this.props.closeModal}>Cancelar</button>
            </>
        )
    }
}

export default AddModel;