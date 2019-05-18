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
        comboValue: null,
        selectedOption: 1
    };

    onChangeRadios = event => {
        this.setState({
            selectedOption: event.target.value
        });

        this.props.updateBehavior(event.target.value);
    }

    /**
     * Método encargado de manejar el cambio del combobox
     */
    onChangeCombo = event => {
        this.setState({
            comboValue: event.target.value,
        });
        const comboObj = JSON.parse(event.target.value)
        if(comboObj.hasOwnProperty('_id')){
            console.log(comboObj._id);
            this.props.updateName(comboObj._id);
        }
    }

    componentDidMount(){
        if(!this.state.comboValue){
            const valueStr = JSON.stringify(this.state.activities[0])
            this.setState({
                comboValue: valueStr
            });
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
        
        const radios = [
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
        
        return (
            <div  className={[classes.form].join(" ")}>
                <Input 
                    type={'select'} 
                    options={this.state.activities} 
                    name={'Actividad'}
                    />
                <Input value={this.state.comboValue} 
                    onChange={this.onChangeCombo} 
                    type={'select'} 
                    name={'Obligatoriedad'} 
                    options={options}
                    />
                <Input selectedOption={this.state.selectedOption} 
                    onChange={this.onChangeRadios} 
                    style={{width: 'unset'}} 
                    name="Tipo de actividad" 
                    type={'radio'} 
                    radios={radios}
                    />
            </div>
        )
    }
}

export default GraphForm;
