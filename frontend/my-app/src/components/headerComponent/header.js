import React, {Component} from 'react';
import { NavItem, Navbar } from "react-bootstrap";
import { LinkContainer} from "react-router-bootstrap";
import "../../App.css"

function logOut(props) {
  props.callback({loggedIn: false});
}

class Header extends Component{

  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }
  
  render(){
    this.state.isLoggedIn = this.props.userData.loggedIn

    return (
      <Navbar variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>Baltimore Crime Visualizer</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">

        {this.state.isLoggedIn ? (
          <div>
          <div id="navbar-link" style={{display:'inline-block', cursor: 'text'}}>{this.props.userData.user_name}</div>
          <div id="navbar-link" style={{display:'inline-block'}} onClick= {logOut.bind(this,this.props)}>
          Signout
          </div>
          </div>
        ) : (
          <div>
          <div id="navbar-link" style={{display:'inline-block'}}>
          <LinkContainer to="/register">
          <NavItem>Signup</NavItem>
          </LinkContainer>
          </div>

          <div id="navbar-link" style={{display:'inline-block'}}>
          <LinkContainer to="/login">
            <NavItem>Login</NavItem>
          </LinkContainer>
          </div> 
          </div>
        )}

        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
