import React from 'react';
import './FrontPageNavBar.css';
import { Button, ButtonToolbar} from 'react-bootstrap';

function FrontPageNavBar() {
  return (
    <ButtonToolbar aria-label="Toolbar with button groups">
        <Button href="/leaderboard" variant="secondary">Leaderboard</Button>
      <Button href="#" variant="secondary" id="front-page-navbar-button">Upload New</Button>
    </ButtonToolbar >
  );
}

export default FrontPageNavBar;