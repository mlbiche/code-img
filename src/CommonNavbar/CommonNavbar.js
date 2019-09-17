import React from 'react';
import { Link } from 'react-router-dom';

import './CommonNavbar.css'

/**
 * CommonNavbar component
 */
function CommonNavbar() {
  return (
    <div id="common-navbar-container">
      <Link to='/' id="brand-name-link">
        <div id="brand-name-container">
          <h1>Code-img</h1>
        </div>
      </Link>
      <div id="authentification-container">
        <a href="/login"><button>Log in</button></a>
        <a href="/registration"><button>Register</button></a>
      </div>
    </div>
  );
}

export default CommonNavbar;