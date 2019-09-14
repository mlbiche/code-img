import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

/**
 * CommonNavbar component
 */
function CommonNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Code-img</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link>Sign in</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Register</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CommonNavbar;