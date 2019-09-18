import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './Discussion.css';

function Discussion({ id, username, date, image }) {
  return (
    <Link to={'/discussion/' + id} className="discussion-link">
      <Card border="dark" >
        <Card.Header>
          <h2 className="discussion-username">{username}</h2>
          <small className="text-muted">On {date.toDateString()} at {date.toLocaleTimeString()}</small>
        </Card.Header>
        <Card.Img src={image} alt={image} className="discussion-main-img" />
      </Card>
    </Link>
  );
}

export default Discussion;