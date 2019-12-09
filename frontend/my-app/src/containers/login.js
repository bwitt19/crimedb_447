import React, {Component} from 'react';
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";
import {Link } from "react-router-dom";
import "../App.css";


class Login extends Component{
  
  constructor(props) {
    super(props);
    this.loginRequest = this.loginRequest.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
  }

  loginRequest() {

    //alert(this.username.current.value);

    fetch("http://localhost:3001/users/register", {
      method: 'POST',
      body: JSON.stringify({
        user_name: this.username.current.value, 
        password: this.password.current.value
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(
        (result) => {
          alert(result.success);
          if (result.success) {
            
          }
        }
               
    )     
  }



  render() {
    
  return (

    <div class="login">
      
      <div id="login-text">Login</div>

      <div id="login-signup-tag">
        Don't have an account?
        <div id="login-signup-tag-link">
          <Link to="/register">Sign up.</Link>
        </div>
      </div>
      <div id="login-forms">
        <Form onSubmit={this.loginRequest}>
          <Form.Group controlId="formGroupUsername" >
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" ref={this.username} placeholder="Enter username" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={this.password} placeholder="Password" />
          </Form.Group>

        </Form>
        <Button id="login-button" onClick={this.loginRequest}>
          Login
        </Button>

        
      </div>
    </div>
          
    ); 
  }
}

export default Login;

