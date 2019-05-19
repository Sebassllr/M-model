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
        selectedActivity: 1,
        comboValue: "",
        selectedoption: 1
    };

    onChangeRadios = event => {
        this.setState({
            selectedoption: event.target.value
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
            this.props.updateObligatory(comboObj._id);
        }
    }

    onChangeActivity = event => {
        this.setState({
            selectedActivity: event.target.value,
        });
        const selectedActivity = JSON.parse(event.target.value)
        if(selectedActivity.hasOwnProperty('_id')){
            this.props.updateName(selectedActivity.name);
        }
    }

    componentDidMount(){
        if(typeof this.state.comboValue === 'number'){
            const valueStr = JSON.stringify(this.props.activities[0])
            this.setState({
                comboValue: valueStr
            });
            this.props.updateName(this.props.activities[0].name);
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
                name: 'type'
            },
            {
                key: 2,
                value: 'Comportamiento',
                title: 'Comportamiento',
                name: 'type'
            }
        ]
        console.log(this.props.activities);
        return (
            <div  className={[classes.form].join(" ")}>
                <Input 
                    type={'select'} 
                    options={this.props.activities} 
                    name={'Actividad'}
                    onChange={this.onChangeActivity}
                    />
                <Input value={this.state.comboValue} 
                    onChange={this.onChangeCombo} 
                    type={'select'} 
                    name={'Obligatoriedad'} 
                    options={options}
                    />
                <Input selectedoption={this.state.selectedoption} 
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
