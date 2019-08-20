import React from 'react';
import { Link } from 'react-router-dom';

import './Discussion.css';

function Discussion({ id, username, date, image }) {
  return (
    <div className="discussion-container">
      <Link to={'/discussion/' + id} className="discussion-header-link">
        <div className="discussion-header">
          <h3>{username}</h3>
          <span className="discussion-date">On {date.toDateString()} at {date.toLocaleTimeString()}</span>
        </div>
      </Link>
      <img src={image} alt={image} />
    </div>
  );
}

export default Discussion;