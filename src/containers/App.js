import React, { Component } from 'react';
import './App.css';
import MainView from '../containers/MainView/mainView';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/';

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <>
          <MainView/>
        </>
      </BrowserRouter>
    );
  }
}

export default App;