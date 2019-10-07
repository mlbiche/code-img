import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserScore, { UPLOAD_SCORE, REACTION_SCORE } from '../UserScore/UserScore';

// Mock up upload User scores object constants
const MOCKUP_UPLOAD_SCORES = [
  { id: 0, username: 'Krystine', score: 20 },
  { id: 1, username: 'Irma', score: 14 },
  { id: 2, username: 'Maureen', score: 13 },
  { id: 3, username: 'Ursella', score: 6 },
  { id: 4, username: 'Sherley', score: 5 }
];

// Mock up upload User scores object constants
const MOCKUP_REACTION_SCORES = [
  { id: 5, username: 'Lexus', score: 46 },
  { id: 6, username: 'Ern', score: 43 },
  { id: 7, username: 'Blaine', score: 34 },
  { id: 8, username: 'Cody', score: 30 },
  { id: 9, username: 'Mario', score: 22 }
];

/**
 * LeaderboardView Component
 */
function LeaderboardView() {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <h3 className="leaderboard-title">Best uploaders</h3>
          {/* Display all the upload scores in different UserScore components */}
          {MOCKUP_UPLOAD_SCORES.map((mockupUploadScore) => (
            <UserScore
              type={UPLOAD_SCORE}
              username={mockupUploadScore.username}
              score={mockupUploadScore.score}
              key={mockupUploadScore.id}
            />
          ))}
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs={12} lg={8}>
          <h3>Most appreciated</h3>
          {/* Display all the reaction scores in different UserScore components */}
          {MOCKUP_REACTION_SCORES.map((mockupReactionScore) => (
            <UserScore
              type={REACTION_SCORE}
              username={mockupReactionScore.username}
              score={mockupReactionScore.score}
              key={mockupReactionScore.id}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default LeaderboardView;