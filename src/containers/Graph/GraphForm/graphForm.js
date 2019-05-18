import React, { Component } from 'react';
import classes from './graphForm.module.css';
import Input from '../../../components/Input/input';

class GraphForm extends Component {
    
    state = {
        activities: [
            { 
                _id: 1,
                name: 'Primera',
                type: 'Comportamiento'
            },
            { 
                _id: 2,
                name: 'Segunda',
                type: 'Estructural'
            },
            { 
                _id: 3,
                name: 'Tercera',
                type: 'Comportamiento'
            }
        ],
        comboValue: {},
    };

    /**
     * Método encargado de manejar el cambio del combobox
     */
    onChangeCombo = event => {
        this.setState({
            comboValue: event.target.value,
        });
        console.log(this.state.comboValue);
        const comboObj = JSON.parse(this.state.comboValue)
        if(comboObj.hasOwnProperty('_id')){
            this.props.updateName(comboObj._id);
        }
    }

    render() {
        
        const options = [
            { 
                _id: 1,
                name: 'Obligatoria',
            },
            { 
                _id: 2,
                name: 'Flexible',
            },
            { 
                _id: 3,
                name: 'Opcional',
            }
        ];         
        
        return (
            <div  className={[classes.form].join(" ")}>
                <Input type={'select'} options={this.state.activities} name={'Actividad'}/>
                <Input value={this.state.comboValue} onChange={this.onChangeCombo} type={'select'} name={'Tipo'} options={options}/>
            </div>
        )
    }
}

export default GraphForm;
