import React from 'react';
import { Link } from 'react-router-dom';
// import './FrontPageNavBar.css';
import { Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';

function FrontPageNavBar() {
  return (

    // <div id='front-page-navbar-container'>
    //   <Link to="/leaderboard">
    //     <button className="front-page-navbar-button">Leaderboard</button>
    //   </Link>
    //   <Link>
    //     <button className="front-page-navbar-button">Upload New</button>
    //   </Link>
    // </div>
    <ButtonToolbar aria-label="Toolbar with button groups">
      <ButtonGroup className="mr-2">
        <Button href="/leaderboard" variant="light" variant="secondary">Leaderboard</Button>
      </ButtonGroup>
      <ButtonGroup className="mr-2">
      <Button href="#" variant="secondary">Upload New</Button>
    </ButtonGroup>
    </ButtonToolbar >
  );
}

export default FrontPageNavBar;