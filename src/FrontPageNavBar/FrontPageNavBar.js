import React from 'react';
import { Link } from 'react-router-dom';
import './FrontPageNavBar.css';

function FrontPageNavBar() {
  return (
    <div id='front-page-navbar-container'>
      <Link to="/leaderboard">
        <button className="front-page-navbar-button">Leaderboard</button>
      </Link>
      <Link>
        <button className="front-page-navbar-button">Upload New</button>
      </Link>
    </div>
  );


}

export default FrontPageNavBar;