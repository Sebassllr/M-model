import React, { Component } from 'react';
import Input from "../../components/Input/input"
import classes from './addModel.module.css';
import Title from '../../components/Title/title';
import Table from '../../components/Table/table';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import Axios from 'axios';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
class AddModel extends Component{

    state = {
        inputs: {
            name: '',
            description: '',
        },
        childList: [],
        comboValue: -1,
        tableData: [],
        editorState: EditorState.createEmpty()
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

    onEditorStateChange = (editorState) => {
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        this.setState({
          editorState,
        });
    };

    placeInputOnItems = () => {

        let description = this.props.edit.description;
        if(this.props.title === 'Tecnicas'){
            const contentBlock = htmlToDraft(this.props.edit.description);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            description = EditorState.createWithContent(contentState);
        }

        const toEditItem = {
            name: this.props.edit.name,
            description: description
        }

        console.log("toEdit", toEditItem);
        this.setState({inputs: toEditItem, editorState: description, tableData: this.props.edit.children})
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

    saveModel = () => {
        let toSendItem = {
            name: this.state.inputs.name,
            description: this.props.title === 'Tecnicas' 
                ? draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) 
                : this.state.inputs.description,
            modelStr: this.props.title
        };

        if(this.state.childList.length){
            toSendItem.children = this.state.tableData.map(i => i._id);
        }

        axios.post('saveModel', toSendItem).then(response =>{
            console.log(response);
            if(response.status === 200){
                this.props.closeModal();
                NotificationManager.success('Se ha guardado correctamente', 'Guardado');
            }
        }).catch(error => {
            console.error(error);
            NotificationManager.error('Por favor ingrese el nombre! ', 'Error!');
        });
    }

    loadDataForCombo = () => {
        console.log('Cargando datos');
        
        Axios.post("getAllModelChildren", { modelStr: this.props.child})
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
        
        if(this.props.edit){
            this.placeInputOnItems();
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

    /**
     * Método encargado de manejar el cambio del combobox
     */
    onChangeCombo = event => {
        console.log(event.target.value);
        this.setState({
            comboValue: event.target.value,
        });
    }

    onEditHandler = () => {

        const fullRequestItem = {
            id: this.props.edit.id,
            modelStr: this.props.title,
        }

        const data = {
            name: this.state.inputs.name,
            description: this.props.title === 'Tecnicas' 
            ? draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) 
            : this.state.inputs.description,
        }

        data[this.props.childB] = this.state.tableData.map(i => i._id);
        fullRequestItem['data'] = data;
        console.log("data", fullRequestItem);
        Axios.post('getModelAndUpdate', fullRequestItem)
        .then(response => {
            console.log(response);
            if(response.status === 200){
                this.props.closeModal();
                NotificationManager.success('Se ha guardado correctamente', 'Guardado');
            }
        }).catch(error => {
            console.error(error);
            NotificationManager.error('Por favor ingrese el nombre! ', 'Error!');
        });
    }

    render(){
        const { editorState } = this.state;
        const combo = {
            height: '23px',
            'padding': '0px 10px' 
        };
        const styles = {
            height: this.props.radios ? "170px": '127px',
        };

        const objectiveTitle = {
            height: '31px',
            fontSize: '12px',
            backgroundColor: '#cccccc8a'
        };

        const renderItems = this.props.childB ? true : false;
        const isTechnique = this.props.title === 'Tecnicas' ? true : false;
        return(
            <div className={classes.grid}>
                <form className={[classes.formGrid, classes.formPadding, isTechnique ? classes.newHeight : null].join(" ")}>
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
                            {!isTechnique ?
                                <Input 
                                    style={styles} 
                                    value={this.state.inputs.description} 
                                    onChange={(event) => {this.inputHandler(event, 2)}} 
                                    name="Descripción"
                                    type="textarea"
                                /> :
                                <Input
                                    name="Descripción" 
                                    type="wysiwyg"
                                    onEditorStateChange={this.onEditorStateChange}
                                    editorState={editorState}
                                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                />
                            }
                        </div>
                        {!renderItems? null:
                            <div className = {[classes.widthRigth, this.props.radios ? "btnW" : null, 
                                this.props.radios ? classes.btnW : null].join(" ")}>
                                { this.props.radios ? 
                                    <Input name="Tipo" required type='radio' radios={this.props.radios} /> : 
                                    null 
                                }
                                <div className= {["displayFlex", classes.combo].join(" ")}>
                                    <Input 
                                        value={this.state.comboValue} 
                                        onChange={this.onChangeCombo} 
                                        style={combo} 
                                        type='select' 
                                        options={this.state.childList} 
                                        name={this.props.child} 
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
                    <button className={classes.btnSave} type="button" onClick={this.props.edit? this.onEditHandler : this.saveModel}>Guardar</button>
                </div>
            </div>
        )
    }
}

export default AddModel;