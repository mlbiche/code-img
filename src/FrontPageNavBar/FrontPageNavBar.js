/**
 * FrontPageNavBar component
 * 
 * Contains the button to the leaderboard
 */
import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

/**
 * FontrPageNavBar component
 */
function FrontPageNavBar() {
  return (
    <ButtonToolbar aria-label="Front page navbar">
      <Button href="/leaderboard" variant="secondary">Leaderboard</Button>
    </ButtonToolbar >
  );
}

export default FrontPageNavBar;