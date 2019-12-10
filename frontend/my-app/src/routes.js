import React, {Component} from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home.js";
import Login from "./containers/login.js";
import Register from "./containers/register.js";
import { Link, Redirect, useHistory } from "react-router-dom";

class Routes extends Component {
  
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

    this.props.callback({
      jwt : params.jwt,
      filters : params.filters,
      loggedIn :params.loggedIn,
      user_name : params.user_name

    });
  }

  render(){
  return (
    <Switch>
      <Route path="/login">
        <Login callback={this.fromChild.bind(this)}/>
      </Route>
      <Route path="/register">
        <Register callback={this.fromChild.bind(this)}/>
      </Route>
      <Route path="/">
        <Home userData = {this.state} />
      </Route>
    </Switch>
  );
  }
}

export default Routes;