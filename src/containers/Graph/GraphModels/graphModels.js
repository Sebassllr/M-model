import React, { Component } from 'react'
import Input from '../../../components/Input/input';
import classes from './graphModels.module.css';

class GraphModels extends Component{

    render(){
        return(
            <div style={{ padding: "20px" }}>
                <Input 
                    onChange={this.props.onChange}
                    selectedoption={this.props.selectedoption} 
                    style={{height: 'unset'}} 
                    name="Modelos" 
                    type='select' 
                    options={this.props.models}/>
                <button 
                    className={ classes.button }
                    onClick={this.props.addItem} 
                    type="button">Agregar
                </button>
            </div>
        )
    }
}

export default GraphModels;