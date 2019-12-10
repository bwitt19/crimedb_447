import React, {Component} from 'react';
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "../App.css";


class Login extends Component{
  
  constructor(props) {
    super(props);
    this.loginRequest = this.loginRequest.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
    this.state = {displayEmsg: false, loggedIn:false};
  }

  loginRequest() {

    fetch("http://54.81.156.189:3001/users/login?user_name="+this.username.current.value+"&password="+this.password.current.value, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(
        (result) => {

          // If new user was created
          if (result.success) {

            // Update components
            this.setState({displayEmsg:false, loggedIn:true});

            // Pass user info back to parent components
            this.props.callback({
              jwt : result.token,
              filters : result.filters,
              loggedIn : true,
              user_name : result.user_name

            });

            // Jump back to homepage
            this.props.history.push("/");  
          }

          // If error during new user creation
          else {
            // Update components to display error msg
            this.setState({displayEmsg:true, loggedIn:false});      
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

        {/* Error message. Only displays if user enters username already tied to account */}
        {this.state.displayEmsg ? (<div id="login-emsg">Invalid Username or Password.</div>) : (<div></div>)}


        {/* If user is logged in disable them from signing up */}
        {this.state.loggedIn ? (
          <Button id="login-button-disabled" disabled>
            Already Logged In
          </Button>
        ) : (
           <Button id="login-button" onClick={this.loginRequest}>
           Login
           </Button>
          
        )}

        
      </div>
    </div>
          
    ); 
  }
}

export default withRouter(Login);

