import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

import './Discussion.css';

function Discussion({ id, username, date, image }) {
  return (
    <Col xs={12} lg={4} md={6}>
      <Link to={'/discussion/' + id} className="discussion-link">
        <div className="discussion-container">
          <div className="discussion-header">
            <h3>{username}</h3>
            <span className="discussion-date">On {date.toDateString()} at {date.toLocaleTimeString()}</span>
          </div>
          <img src={image} alt={image} />
        </div>
      </Link>
    </Col>
  );
}

export default Discussion;