import React from 'react';
// import { Link } from 'react-router-dom';

// import './CommonNavbar.css'
import { Navbar, Nav } from 'react-bootstrap';

/**
 * CommonNavbar component
 */
function CommonNavbar() {
  return (
    // <div id="common-Navbar-container">
    //   <Link to='/' id="brand-name-link">
    //     <div id="brand-name-container">
    //       <h1>Code-img</h1>
    //     </div>
    //   </Link>
    //   <div id="authentification-container">
    //     <a href="/login"><button>Log in</button></a>
    //     <a href="/registration"><button>Register</button></a>
    //   </div>
    // </div>
    <Navbar className="bg-dark justify-content-between" bg="dark" variant="dark">
      <Navbar.Brand href="/">Code-img</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-Navbar-nav" />
      <Navbar.Collapse id="responsive-Navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/login">Sign in</Nav.Link>
          <Nav.Link href="/registration">Register</Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
      );
    }
    
export default CommonNavbar;