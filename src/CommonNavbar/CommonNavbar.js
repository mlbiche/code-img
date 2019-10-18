/**
 * CommonNavbar component
 * 
 * Display the navbar with the brandname and the authentication links
 */
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
          <Nav.Link href="/login">Sign in</Nav.Link>
          <Nav.Link href="/registration">Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CommonNavbar;