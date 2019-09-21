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
        selectedActivity: -1,
        comboValue: "",
        selectedoption: 1,
    };

            
    options = [
        {
            _id: 1,
            name: 'Obligatoria',
            value: 1,
        },
        { 
            _id: 2,
            name: 'Flexible',
            value: 2,
        },
        { 
            _id: 3,
            name: 'Opcional',
            value: 3,
        }
    ];

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
        console.log(event.target.value);
        this.props.updateObligatory(Number(event.target.value));
        /*const item = this.options.filter(item => item._id == event.target.value);
        if(item.length){
            
        }*/
    }

    onChangeActivity = event => {
        this.setState({
            selectedActivity: event.target.value,
        });

        const item = this.props.activities.filter(item => item._id == event.target.value);
        console.log(item);
        if(item.length){
            this.props.updateName(item[0]);
        }
    }

    componentDidMount(){/*
        if(this.props.activities.length && this.props.item.key !== -1){
            const valueStr = this.props.activities[0];
            this.setState({
                comboValue: valueStr
            });
            this.props.updateName(this.props.activities[0].name);
        }*/
        if(this.props.item){
            console.log(this.props.item);
            this.setState({
                selectedActivity: this.props.item.key,
                comboValue: this.props.item.typeIntern,
                selectedoption: this.props.item.structOrBehavioral,
            })
        }
    }

    render() {
        
        const radios = [
            {
                key: 2,
                value: 'Estructural',
                title: 'Estructural',
                name: 'type'
            },
            {
                key: 1,
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
                    value={ this.state.selectedActivity }
                    onChange={this.onChangeActivity}
                    />
                <Input 
                    value={this.state.comboValue} 
                    onChange={this.onChangeCombo} 
                    type={'select'} 
                    name={'Obligatoriedad'} 
                    options={this.options}
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
