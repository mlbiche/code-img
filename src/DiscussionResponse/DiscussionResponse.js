/**
 * DiscussionResponse component
 * 
 * Display a response in the discussion thread
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import './DiscussionResponse.css';

/**
 * DiscussionResponse component
 * @param props
 *    - username: The response author name
 *    - date: The date on which the response has been posted
 *    - img: The response image
 */
function DiscussionResponse({ username, date, img }) {
  return (
    <Col lg={7} xs={12} className="discussion-response-col">
      <div>
        <h2 className="discussion-username">{username}</h2>
        <small className="text-muted">On {date.toDateString()} at {date.toLocaleTimeString()}</small>
      </div>
      <div className="discussion-response-img">
        <img src={img} alt={img} />
      </div>
      <hr />
    </Col>
  );
}

/**
 * Define the component property types
 */
DiscussionResponse.propTypes = {
  username: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  img: PropTypes.string.isRequired,
};

export default DiscussionResponse;