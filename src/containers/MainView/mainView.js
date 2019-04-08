import React, { Component } from 'react';
import Administrator from '../Administrator/administrator';
import Graph from '../Graph/graph';
import { Route, NavLink } from 'react-router-dom';
import MainMenu from '../MainMenu/mainMenu';
import classes from './mainView.module.css';
import { NotificationContainer } from 'react-notifications';

class MainView extends Component {
  
  state = {
    renderList: [
      {
        id: 1,
        path:"/admin/model",
        name:"Modelos",
        child:"Procesos",
        childB:'processes',
      },
      {
        id: 2,
        path:"/admin/processes",
        name:"Procesos",
        child:"Objetivos",
        childB:'objectives',
      },
      {
        id: 3,
        path:"/admin/objectives",
        name:"Objetivos",
        child:"Actividades",
        childB:'activities',
      },
      {
        id: 4,
        path:"/admin/activities",
        name:"Actividades",
        child:"Tecnicas",
        childB:'technique',
      },
      {
        id: 5,
        path:"/admin/tecnics",
        all:'getAllModels',
        name:'Tecnicas',
        childB:null,
      }
    ]
  }
  

  render(){

    return (
        <div>
          <nav className="navBar centerVertical">
            <ol className="centerVertical">
              <hr/>
              <NavLink activeClassName={classes.active} to="/graph">
                <li id="graph" className="marginAuto">
                  <div className="logo graph" >
                    <span className="logo graph"></span>
                    <span className={[classes.textActive, classes.text].join(" ")}>Graficador</span>
                  </div>
                </li>
              </NavLink>
              <hr/>
              <NavLink  activeClassName={classes.active} to="/admin">
                <li id="users" className="marginAuto">
                    <div className="logo admin">
                        <span className="logo admin"></span>
                        <span className={[classes.textActive, classes.text].join(" ")}>Administrador</span>
                    </div>
                </li>
              </NavLink>
              <hr/>
            </ol>
          </nav>
          <Route path="/admin" component={MainMenu}/>
          <Route path="/graph" exact component={Graph} />
          {this.state.renderList.map(i => {
            return (
                <Route key={i.id} path={i.path} exact render={
                  () => {
                  return (
                    <Administrator
                      name={i.name}
                      child={i.child}
                      childB={i.childB}/>
                  )}
                }/>
              );
            })
          }
          <NotificationContainer />
        </div>
      );
  }

}

export default MainView;