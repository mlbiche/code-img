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
        <button>Sign in</button>
        <button>Register</button>
      </div>
    </div>
  );
}

export default CommonNavbar;