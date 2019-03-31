import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './mainMenu.module.css';

class MainMenu extends Component {

    state = {
        list: [
            {
                id: 1,
                to:'/admin/model',
                text: 'Modelos',
                selected: false,
                child: 'objectives'
            },
            {
                id: 2,
                to:'/admin/objectives',
                text: 'Objetivos',
                selected: false,
                child: 'activities'
            },
            {
                id: 3,
                to:'/admin/activities',
                text: 'Actividades',
                selected: false,
                child: 'techniques'
            },
            {
                id: 4,
                to:'/admin/tecnics',
                text: 'Técnicas',
                selected: false,
                child: null,
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
                        <NavLink activeClassName={classes.active} key={item.id} onClick={() => this.onClick(item.id)} to={item.to}>
                            <li className={item.selected ? classes.activated : null}>{item.text}</li>
                        </NavLink>
                    );
                })}
            </ol>
        );
    }
}

export default MainMenu;
