import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import { Spinner } from 'reactstrap';
// import {Form} from 'antd';
// import { Button } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress, Button } from 'antd';
import { Steps } from 'antd';
import './components/Progress.js'
import ProgressClass from './components/Progress.js';
import Query from './components/Query';

const { Step } = Steps;

const ButtonGroup = Button.Group;

class App extends React.Component {
  state = {
    currentValue: 0
  };
  setApp() {
    this.setState = {
      currentValue: this.state.currentValue + 1
    }
  }
  render() {
    return (
      <div>
        <ProgressClass currentValue={this.state.currentValue}/>,
        <Query value={this.setApp.bind(this)}/>
      </div>
      
    );
  }
}

export default App;
