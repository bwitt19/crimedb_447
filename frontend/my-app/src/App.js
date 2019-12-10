import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router} from "react-router-dom";
import Header from './components/headerComponent/header';
import Routes from './routes.js'

export const jwt = React.createContext("Hi");

class App extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      jwt : "",
      filters : [],
      loggedIn :false,
      user_name : ""
    }
  }

  fromChild(params) {
    this.setState({
      jwt : params.jwt,
      filters : params.filters,
      loggedIn :params.loggedIn,
      user_name : params.user_name
    })

  }

  logOut(params) {   
    this.setState({
      loggedIn: false
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header userData = {this.state} callback={this.logOut.bind(this)}/>
          <Routes callback={this.fromChild.bind(this)}/>
        </Router>        
      </div>
    );
  }
}

export default App;