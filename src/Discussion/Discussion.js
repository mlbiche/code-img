import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

import './Discussion.css';

function Discussion({ id, username, date, image }) {
  return (
    <Col className="discussion-col" lg md={6} xs={12}>
      <Link to={'/discussion/' + id} className="discussion-link">
        <div className="discussion-header">
          <h3>{username}</h3>
          <span className="discussion-date">On {date.toDateString()} at {date.toLocaleTimeString()}</span>
        </div>
        <img src={image} alt={image} />
      </Link>
    </Col>
  );
}

export default Discussion;