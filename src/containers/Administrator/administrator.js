import React, { Component } from 'react'
import Modal from 'react-awesome-modal';
import AddModel from '../AddModel/addModel';
import classes from './administrator.module.css';
import LeftComponent from '../../components/leftComponent/leftComponent';
import RightComponent from '../../components/RightComponent/rightComponent';
import Axios from 'axios';
import 'react-notifications/lib/notifications.css';

class Administrator extends Component {

    state = {
        openModal: false,
        models: [],
        selectedNode: {
            name: "",
            description: "",
            child: []
        },
        showPopUp: false,
        selectedChild: {
            name: '',
            description: '',
            objective: '',
        },
        isEdit: false,
        openModalAddChild: true,
    };

    addClickHandler = () => {
        console.log("Add");
        this.setState({isEdit: false, openModal: true});
    }

    editClickHandler = () => {
        console.log(this.state.selectedNode);
        console.log("Nodo Seleccionado", this.state.selectedNode);
        this.setState({isEdit: true, openModal: true});
    }

    deleteClickHandler = () => {
        console.log("delete");
    }

    closeModal = () => {
        this.setState({
            openModal: false,
            models: []
        });
        this.getAllModels();
    }

    componentDidMount () {
        if(!this.state.models.length){
            this.getAllModels();
        }
    }

    addChildrenPopUp = () => {

    }

    /**
     * Obtiene todos los modelos creados
     */
    getAllModels = () => {
        console.log(this.props.name);
        Axios.post("getAllModels", {modelStr: this.props.name})
        .then(response => {
            console.log(response.data);
            const models = response.data;
            models.forEach(i => {
                i.selected = false;
            });
            this.setState({models: response.data});
        });
    }

    /**
     * Evento de click del árbol de modelos
     */
    nodeClick = (event, nodeId) => {
        this.selectedNode(nodeId);
    }

    /**
     * Método que selecciona el nodo
     */
    selectedNode = id => {

        const newModel = [...this.state.models];
        let selectedNode = {};
        newModel.forEach(i => {
            if(i._id === id){
                selectedNode = {id: i._id, name: i.name, description: i.description};
                selectedNode.children = i[this.props.childB];
                i.selected = true;
            }else{
                i.selected = false;
            }
        });
        if(this.props.childB){
            this.showChild(newModel, selectedNode);    
        }else{
            this.setState({models: newModel, selectedNode: selectedNode});
        }
    }

    showChild = (newModel, selectedNode)=> {
        Axios
        .post('getAllChildren', {childStr: this.props.child, children: selectedNode.children})
        .then(response => {
            selectedNode.children = response.data;
            this.setState({models: newModel, selectedNode: selectedNode});
        });
    }

    /**
     * Método encargado de cerrar el pop up de información de la actividad seleccionada
     */
    closePopUp = () => {
        this.setState({
            showPopUp: false
        });
    }

    /**
     * Método encargado de abrir el pop up con la información de la actividad seleccionada
     */
    openPopUp = id => {
        
        const item = this.state.selectedNode.children.filter(i => id === i._id)[0];
        const selected = {
            name: item.name,
            description: item.description,
        }
        this.setState({selectedChild: selected, showPopUp: true});
        console.log("Nodo Seleccionado", this.state.selectedNode);
    }

    render(){
        const hrStyle = {
            width: '100%',
            'marginBottom': '10px'
        }
        let size = {
            width: "700",
            height: "357"
        }
        let activities = null;
        if(this.props.name === "Actividades"){
            size.height = '400';
            activities = [
                {
                    key: 1,
                    value: 'Estructural',
                    title: 'Estructural',
                    name: 'type',
                    checked: 'checked',
                },
                {
                    key: 2,
                    value: 'Comportamiento',
                    title: 'Comportamiento',
                    name: 'type'
                }
            ]
        }
        
        if(!this.props.childB){
            size.height = '500';
        }

        return(
            <div className={[classes.greyBackground, classes.fullHeight, "displayFlex"].join(" ")}>
                <LeftComponent 
                    title={this.props.name}
                    addClick={this.addClickHandler} 
                    editClick={this.editClickHandler} 
                    deleteClick={this.deleteClickHandler}
                    buttons={this.state.buttons}
                    list={this.state.models}
                    nodeClick={this.nodeClick}
                />
                <Modal 
                    visible={this.state.showPopUp}
                    width="400"
                    height="300"
                    effect="fadeInUp"
                    onClickAway={() => this.closePopUp()}
                >
                    <div className={classes.modal}>
                        <h1>{this.state.selectedChild.name}</h1>
                        <hr style={hrStyle}/>
                        <p>{this.state.selectedChild.description}</p>
                    </div>
                </Modal>
                <RightComponent 
                    name={this.state.selectedNode.name} 
                    description={this.state.selectedNode.description}
                    children={this.state.selectedNode.children} 
                    showPopUp={this.openPopUp}
                    child={this.props.child}/>
                <Modal 
                    visible={this.state.openModal}
                    width={size.width}
                    height={size.height}
                    effect="fadeInUp"
                    >
                        {!this.state.openModal ? null:                     
                            <AddModel 
                                childB={this.props.childB} 
                                title={this.props.name} 
                                child={this.props.child} 
                                closeModal={this.closeModal}
                                childField={this.props.childB}
                                radios={activities}
                                edit={this.state.isEdit ? this.state.selectedNode : null}/>
                        }

                </Modal>
                
            </div>
        )
    }
}

export default Administrator;