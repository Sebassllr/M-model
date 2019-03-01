import React, { Component } from 'react'
import ReactModal from 'react-modal';
import AddModel from '../AddModel/addModel';
import classes from './administrator.module.css';
import LeftComponent from '../../components/leftComponent/leftComponent';
import RightComponent from '../../components/RightComponent/rightComponent';

class Administrator extends Component {

    state = {
        openModal: false
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
        this.setState({openModal: false});
    }

    render(){
        return(
            <div className={[classes.greyBackground, classes.fullHeight, "displayFlex"].join(" ")}>
                <LeftComponent 
                    addClick={this.addClickHandler} 
                    editClick={this.editClickHandler} 
                    deleteClick={this.deleteClickHandler}
                    buttons={this.state.buttons}/>
                <RightComponent/>
                <ReactModal isOpen={this.state.openModal} >
                    <AddModel closeModal={this.closeModal}/>
                </ReactModal>
            </div>
        )
    }

}

export default Administrator;