import React, { Component } from 'react'
import ReactModal from 'react-modal';
import Modal from 'react-awesome-modal';
import AddModel from '../AddModel/addModel';
import classes from './administrator.module.css';
import LeftComponent from '../../components/leftComponent/leftComponent';
import RightComponent from '../../components/RightComponent/rightComponent';
import Axios from 'axios';

class Administrator extends Component {

    state = {
        openModal: false,
        models: [],
        selectedNode: {
            name: "",
            description: "",
            activities: []
        },
        showPopUp: false,
        selectedActivity: {
            name: '',
            description: '',
            objective: '',
        }
    };

    addClickHandler = () => {
        console.log("Add");
        this.setState({openModal: true});
    }

    editClickHandler = () => {
        console.log("Edit");
        this.setState({openModal: true});
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

    getAllModels = () => {
        Axios.get('getAllModels')
        .then(response => {
            console.log(response.data);
            const models = response.data;
            models.forEach(i => {
                i.selected = false;
            });
            this.setState({models: response.data});
        });
    }

    nodeClick = (event, nodeId) => {
        const id = {id: nodeId};
        this.selectedNode(nodeId);
        Axios.post('getModelById', id)
        .then(response => {
            console.log(response.data);
            const data = response.data;
            this.setState({selectedNode: data});
        });
    }

    selectedNode = id => {
        const newModel = [...this.state.models];
        newModel.forEach(i => {
            if(i._id === id){
                i.selected = true;
            }else{
                i.selected = false;
            }
        });
        this.setState({models: newModel});
    }


    closePopUp = () => {
        this.setState({
            showPopUp: false
        });
    }

    openPopUp = id => {
        console.log("Estoy acá");
        const toSendObj = {
            id: id
        }
        Axios.post('getActivityById', toSendObj)
        .then((response) => {
            const data = response.data;
            const selectedActivityData  = {
                name: data.name,
                description: data.description,
                objective: data.objective,
            }
            this.setState({
                showPopUp: true, selectedActivity: selectedActivityData
            });
            console.log(selectedActivityData);
        });
        
    }

    render(){
        return(
            <div className={[classes.greyBackground, classes.fullHeight, "displayFlex"].join(" ")}>
                <LeftComponent 
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
                        <h1>{this.state.selectedActivity.name}</h1>
                        <p>{this.state.selectedActivity.description}</p>
                        <p>{this.state.selectedActivity.objective}</p>
                    </div>
                </Modal>
                <RightComponent 
                    name={this.state.selectedNode.name} 
                    description={this.state.selectedNode.description}
                    activities={this.state.selectedNode.activities} 
                    showPopUp={this.openPopUp}/>
                <ReactModal isOpen={this.state.openModal} >
                    <AddModel closeModal={this.closeModal}/>
                </ReactModal>
            </div>
        )
    }

}

export default Administrator;