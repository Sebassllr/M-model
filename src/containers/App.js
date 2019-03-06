import React, { Component } from 'react';
import './App.css';
import MainView from '../containers/MainView/mainView';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'localhost:3001/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'; 
axios.defaults.headers.post['Content-type'] = 'application/json';

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

