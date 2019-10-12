import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import './DiscussionResponse.css';

/**
 * DiscussionResponse component
 * @param username The response author name
 * @param date The date on which the response has been posted
 * @param img The response image
 * @param reactions The reactions given to the response
 */
function DiscussionResponse({ username, date, img, reactions }) {
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
 * The type property only accept UPLOAD_SCORE and REACTION_SCORE values
 */
DiscussionResponse.propTypes = {
  username: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  img: PropTypes.string.isRequired,
  reactions: PropTypes.array.isRequired // TODO : Improve this property type
};

export default DiscussionResponse;