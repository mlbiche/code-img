import React from 'react';
import PropTypes from 'prop-types';

import './DiscussionResponse.css';

function DiscussionResponse({username, date, img, reactions}) {
  return (
    <div>
      <div className="discussion-response-header">
        <h2>{username}</h2>
        <span className="discussion-response-date">On {date.toDateString()} at {date.toLocaleTimeString()}</span>
      </div>
      <div className="discussion-response-content">
        <img src={img} alt={img} />
      </div>
    </div>
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