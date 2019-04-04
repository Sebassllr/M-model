import React, { Component } from 'react';
import Input from "../../components/Input/input"
import classes from './addModel.module.css';
import Title from '../../components/Title/title';
import Table from '../Table/table';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import Axios from 'axios';


class AddModel extends Component{

    state = {
        inputs: {
            name: '',
            description: '',
        },
        activity: {
            name: '',
            description: '',
            objective: '',
        },
        childList: [],
        comboValue: -1,
        tableData: [],
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
        let toSendItem = {
            name: this.state.inputs.name,
            description: this.state.inputs.description,
            modelStr: this.props.title
        };

        if(this.state.childList.length){
            toSendItem.children = this.state.tableData.map(i => i._id);
        }

        await axios.post('saveModel', toSendItem).then(response =>{
            this.props.closeModal();
            NotificationManager.success('Se ha guardado correctamente', 'Guardado');
        });
    }

    loadDataForCombo = () => {
        console.log('Cargando datos');
        
        Axios.post(this.props.getChild, { modelStr: this.props.child})
        .then(response => {
            if(response.data.length){
                const value = response.data[0];
                console.log(value);
                this.setState({
                    childList: response.data, 
                    comboValue: JSON.stringify(value)
                });
            }else{
                this.setState({
                    childList: ['no data'],
                    comboValue: 'Sin datos'
                });
            }
        });        
    }

    componentDidMount(){
        if(!this.state.childList.length){
            this.loadDataForCombo();
        }
    }

    addToTable = () => {
        const list = [...this.state.tableData];
        const obj = JSON.parse(this.state.comboValue);

        list.push({...obj, key: this.state.comboValue._id});
        this.setState({
            tableData: list,
        });
    }

    onChangeCombo = event => {
        console.log(event.target.value);
        this.setState({
            comboValue: event.target.value,
        });
    }

    render(){
        const combo = {
            height: '23px',
            'padding': '0px 10px' 
        };
        const styles = {
            height: '127px'
        };

        const objectiveTitle = {
            height: '31px',
            fontSize: '12px',
            backgroundColor: '#cccccc8a'
        };

        const renderItems = this.props.childB ? true : false;

        return(
            <div className={classes.grid}>
                <form className={[classes.formGrid, classes.formPadding].join(" ")}>
                    <Title titleStyle={{
                        border: '1px solid #8e8e8e'
                    }} title={"Agregar " + this.props.title}/>
                    <div className={[classes.margin, "displayFlex"].join(' ')} >
                    
                        <div className={[classes.widthLeft, !renderItems ? classes.fullWidth : null ].join(" ")}>
                            <Input 
                                value={this.state.inputs.name} 
                                onChange={(event) => {this.inputHandler(event, 1)}} 
                                name="Nombre" 
                                type="input" 
                                required
                            />
                            <Input 
                                style={styles} 
                                value={this.state.description} 
                                onChange={(event) => {this.inputHandler(event, 2)}} 
                                name="Descripción" 
                                type="textarea"
                            />
                        </div>
                        {!renderItems? null:
                            <div className = {classes.widthRigth}>
                                <div className= {["displayFlex", classes.combo].join(" ")}>
                                    <Input 
                                        value={this.state.comboValue} 
                                        onChange={this.onChangeCombo} 
                                        style={combo} type='select' 
                                        options={this.state.childList} 
                                        name={this.props.child} 
                                        required
                                    />
                                    <div className={classes.button}>
                                        <button 
                                            type="button" 
                                            className={classes.addButton} 
                                            onClick={this.addToTable}>
                                        </button>
                                    </div>
                                </div>
                                <div className= {classes.table}>
                                    <div className={classes.tableContainer}>
                                        <Title 
                                            titleStyle={objectiveTitle} 
                                            title={this.props.child}
                                        />
                                        <div>
                                            <Table data={this.state.tableData}/>                                
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        }
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