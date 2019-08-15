import React from 'react';
import PropTypes from 'prop-types';

import './UserScore.css';

function UserScore({ type, username, score }) {
    return (
        <div className="user-score-container">
            <p>{ username }</p>
            <p>
                { score } <span>
                    { type === 'upload-count' && 'uploaded images' }
                    { type === 'reaction-count' && 'like reactions' }
                </span>
            </p>
        </div>
    );
}

UserScore.propTypes = {
    type: PropTypes.string.isRequired,
    username: PropTypes.oneOf([
        'upload-count',
        'reaction-count'
    ]).isRequired,
    score: PropTypes.number.isRequired
};

export default UserScore;