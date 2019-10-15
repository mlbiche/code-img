/**
 * UserScore component
 * 
 * Define a division containing a user name and its associated score
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import './UserScore.css';

// UserScore type constants
export const SCORE_TYPE = {
  UPLOAD_SCORE: 'upload-score',
  REACTION_SCORE: 'reaction-score'
};

/**
 * UserScore component
 * @param type The score type. Only UPLOAD_SCORE or REACTION_SCORE values are allowed
 * @param username The user related to the score
 * @param score The score number
 */
function UserScore({ type, username, score }) {
  return (
    <Container className="user-score-container">
      <Row>
        <Col xs={12} md={6}>{username}</Col>
        <Col xs={12} md={6}>{score}
          <span>
            {/* Adapt the score text depending on the user score type */}
            {type === SCORE_TYPE.UPLOAD_SCORE && ' uploaded images'}
            {type === SCORE_TYPE.REACTION_SCORE && ' like reactions'}
          </span>
        </Col>
      </Row>
    </Container>
  );
}

/**
 * Define the component property types
 * The type property only accept UPLOAD_SCORE and REACTION_SCORE values
 */
UserScore.propTypes = {
  type: PropTypes.oneOf([
    SCORE_TYPE.UPLOAD_SCORE,
    SCORE_TYPE.REACTION_SCORE
  ]).isRequired,
  username: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
};

export default UserScore;