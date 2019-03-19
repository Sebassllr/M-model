import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import classes from './mainMenu.module.css';

class MainMenu extends Component {

    state = {
        list: [
            {
                id: 1,
                to:'/admin/model',
                text: 'Modelos',
                selected: false,
            },
            {
                id: 2,
                to:'/admin/objectives',
                text: 'Objetivos',
                selected: false,
            },
            {
                id: 3,
                to:'/admin/activites',
                text: 'Actividades',
                selected: false,
            },
            {
                id: 4,
                to:'/admin/tenics',
                text: 'Técnicas',
                selected: false,
            },
        ],
    }

    onClick = id => {
        const list = [...this.state.list];
        list.forEach(item => {
            if(item.id === id){
                item.selected = true;
            }else{
                item.selected = false;
            }
        });
        this.setState({list: list});
    }

    render(){
        return(
            <ol className={classes.list}>
                {this.state.list.map(item => {
                    return(
                        <Link onClick={() => this.onClick(item.id)} to={item.to}>
                            <li className={item.selected ? classes.activated : 'Hola'}>{item.text}</li>
                        </Link>
                    );
                })}
            </ol>
        );
    }
}

export default MainMenu;
