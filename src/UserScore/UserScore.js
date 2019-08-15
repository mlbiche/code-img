import React from 'react';
import PropTypes from 'prop-types';

import './UserScore.css';

export const UPLOAD_SCORE = 'upload-score';
export const REACTION_SCORE = 'reaction-score';

function UserScore({ type, username, score }) {
    return (
        <div className="user-score-container">
            <p>{ username }</p>
            <p>
                { score } <span>
                    { type === UPLOAD_SCORE && 'uploaded images' }
                    { type === REACTION_SCORE && 'like reactions' }
                </span>
            </p>
        </div>
    );
}

UserScore.propTypes = {
    type: PropTypes.oneOf([
        UPLOAD_SCORE,
        REACTION_SCORE
    ]).isRequired,
    username: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
};

export default UserScore;