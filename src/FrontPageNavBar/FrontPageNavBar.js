import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

function FrontPageNavBar() {
  return (
    <ButtonGroup>
      <Button href="/leaderboard" variant="dark">Leaderboard</Button>
      <Button variant="dark">Upload New</Button>
    </ButtonGroup>
  );
}

export default FrontPageNavBar;