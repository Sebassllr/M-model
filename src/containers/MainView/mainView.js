import React, { Component } from 'react';
import Administrator from '../Administrator/administrator';
import Graph from '../Graph/graph';
import { Route, Link } from 'react-router-dom';
import MainMenu from '../MainMenu/mainMenu'

class MainView extends Component {

    render(){
        return (
            <div>
              <nav className="navBar centerVertical">
                <ol className="centerVertical">
                  <hr/>
                  <li id="graph" className="marginAuto">
                    <Link className="logo graph" to="/graph">
                      <span className="logo graph"></span>
                      <span className="text">Graficador</span>
                    </Link>
                  </li>
                  <hr/>
                  <li id="users" className="marginAuto">
                    <Link className="logo admin" to="/admin">
                      <span className="logo admin"></span>
                      <span className="text">Administrador</span>
                    </Link>
                  </li>
                  <hr/>
                </ol>
              </nav>
              <Route path="/admin" component={MainMenu}/>
              <Route path="/admin/model" exact component={Administrator} />
              <Route path="/graph" exact component={Graph} />
            </div>
          );
    }

}

export default MainView;