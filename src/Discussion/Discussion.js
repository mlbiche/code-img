/**
 * Discussion component
 * 
 * Display a discussion with its first response
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

import './Discussion.css';

/**
 * Discussion component
 * @param props
 *    - id: The discussion ID
 *    - username: The author username
 *    - date: The creation date
 *    - img: The first response image
 */
function Discussion({ id, username, date, img }) {
  return (
    <Col xs={12} lg={4} md={6}>
      <Link to={'/discussion/' + id} className="discussion-link">
        <div className="discussion-container">
          <div className="discussion-header">
            <h3>{username}</h3>
            <span className="discussion-date">On {date.toDateString()} at {date.toLocaleTimeString()}</span>
          </div>
          <img src={img} alt={img} />
        </div>
      </Link>
    </Col>
  );
}

/**
 * Define the component property types
 */
Discussion.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  img: PropTypes.string.isRequired
};

export default Discussion;