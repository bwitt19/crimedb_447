import React, {Component} from 'react';
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "../App.css";

class Register extends Component{
  
  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
    this.state = {displayEmsg: false, loggedIn:false};
  }


  // Register Signup Request
  RegisterRequest(username, password) {

    // Post HTTP request to create a new account
    fetch("http://54.81.156.189:3001/users/register", {
        method: 'POST',
        body: JSON.stringify({
          user_name: username.current.value, 
          password: password.current.value
        }),
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

    <div class="register">
      
      <div id="register-text">Register</div>

      <div id="register-forms">
        
        {/* The input forms to get username and password to create a new account */}
        <Form>
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
        {this.state.displayEmsg ? (<div id="register-emsg">An account with this Username already exists.</div>) : (<div></div>)}

        {/* If user is logged in disable them from signing up */}
        {this.state.loggedIn ? (
          <Button id="register-button-disabled" disabled>
            Already Logged In
          </Button>
        ) : (
           <Button id="register-button" onClick={this.RegisterRequest.bind(this,this.username,this.password)}>
           Register
           </Button>
          
        )}
        

        
      </div>
    </div>
          
    ); 
  }
}

export default withRouter(Register);

