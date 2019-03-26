import React, { Component } from 'react';
import Input from "../../components/Input/input"
import classes from './addModel.module.css';
import Title from '../../components/Title/title';
import Table from '../../components/Table/table';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';


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

    addToTable = () => {
        
    }

    render(){
        const combo = {
            height: '25px',
            'padding': '0px 10px' 
        };
        const styles = {
            height: '282px'
        };

        const products = [{
            value: 1,
            name: "Product1",
        }, {
            value: 2,
            name: "Product2",
        }, {
            value:32,
            name: "Product2",
        }];

        return(
            <div className={classes.grid}>
                <form className={[classes.formGrid, classes.formPadding].join(" ")}>
                    <div className="displayFlex">
                        <div className={classes.widthLeft}>
                            <Input value={this.state.inputs.name} onChange={(event) => {this.inputHandler(event, 1)}} name="Nombre" type="input" required/>
                            <Input style={styles} value={this.state.description} onChange={(event) => {this.inputHandler(event, 2)}} name="Descripción" type="textarea"/>
                        </div>
                        <div className = {classes.widthRigth}>
                            <div className= {["displayFlex", classes.combo].join(" ")}>
                                <Input style={combo} type='select' options={products} name="Objetivos" required/>
                                <div className={classes.button}>
                                    <button type="button" className={classes.addButton} onClick={this.addToTable}>+</button>
                                </div>
                            </div>
                            <div className= {classes.table}>
                                <Table>
                                </Table>
                                <button type="button" onClick={this.props.closeModal}>Eliminar</button>
                            </div>  
                        </div>
                    </div>
                </form>
                <div className={
                    [
                        classes.displayGrid,
                        classes.paddingButtons, 
                        classes.bottomButtons, 
                        "displayFlex", 
                        classes.formButtons
                    ].join(" ")}>

                    <button className={classes.btnCancel} type="button" onClick={this.props.closeModal}>Cancelar</button>
                    <button className={classes.btnSave} type="button" onClick={this.saveModel}>Guardar</button>
                </div>
            </div>
        )
    }
}

export default AddModel;