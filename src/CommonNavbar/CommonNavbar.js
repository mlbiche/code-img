import React from 'react';
import './CommonNavbar.css'

function CommonNavbar() {
  return (
    <div id="common-navbar-container">
      <div id="brand-name-container">
        <h1>Code-img</h1>
      </div>
      <div id="authentification-container">
        <button>Sign in</button>
        <button>Register</button>
      </div>
    </div>
  );
}

export default CommonNavbar;