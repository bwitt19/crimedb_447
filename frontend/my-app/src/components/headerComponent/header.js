import React, {Component} from 'react';
import { Nav, Navbar } from "react-bootstrap";

class Header extends Component{
  render(){
    return (

      <Navbar variant="dark">
        <Navbar.Brand href="/">Baltimore Crime Visualizer</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
         
          <Nav>
            <Nav.Link href="/signup">Signup</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>         
    
        </Navbar.Collapse>
      </Navbar>
          
    );
  }
}

export default Header;
