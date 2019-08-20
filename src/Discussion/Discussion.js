import React from 'react';

import './Discussion.css';

function Discussion({ username, date, image }) {
  return (
    <div className="discussion-container">
      <div className="discussion-header">
        <h3>{username}</h3>
        <span className="discussion-date">On {date.toDateString()} at {date.toLocaleTimeString()}</span>
      </div>
      <img src={image} alt={image} />
    </div>
  );
}

export default Discussion;