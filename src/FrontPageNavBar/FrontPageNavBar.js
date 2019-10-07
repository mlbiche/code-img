import React from 'react';
import './FrontPageNavBar.css';
import { Button, ButtonToolbar } from 'react-bootstrap';

function FrontPageNavBar() {
  return (
    <ButtonToolbar aria-label="Front page navbar">
      <Button href="/leaderboard" variant="secondary">Leaderboard</Button>
    </ButtonToolbar >
  );
}

export default FrontPageNavBar;