import React from 'react';
import UserScore, { UPLOAD_SCORE, REACTION_SCORE } from '../UserScore/UserScore';

import './LeaderboardView.css';

// Mock up upload User scores object constants
const MOCKUP_UPLOAD_SCORES = [
  { username: 'Krystine', score: 20 },
  { username: 'Irma', score: 14 },
  { username: 'Maureen', score: 13 },
  { username: 'Ursella', score: 6 },
  { username: 'Sherley', score: 5 }
];

// Mock up upload User scores object constants
const MOCKUP_REACTION_SCORES = [
  { username: 'Lexus', score: 46 },
  { username: 'Ern', score: 43 },
  { username: 'Blaine', score: 34 },
  { username: 'Cody', score: 30 },
  { username: 'Mario', score: 22 }
];

/**
 * LeaderboardView Component
 */
function LeaderboardView() {
  return (
    <div id="learderboard-container">
      <h2 id="learderboard-title">Leaderboard</h2>
      <h3>Best uploaders</h3>
      {/* Display all the upload scores in different UserScore component */}
      {MOCKUP_UPLOAD_SCORES.map((mockupUploadScore) => (
        <UserScore type={UPLOAD_SCORE} username={mockupUploadScore.username} score={mockupUploadScore.score} />
      ))}
      <h3>Most appreciated</h3>
      {/* Display all the reaction scores in different UserScore component */}
      {MOCKUP_REACTION_SCORES.map((mockupReactionScore) => (
        <UserScore type={REACTION_SCORE} username={mockupReactionScore.username} score={mockupReactionScore.score} />
      ))}
    </div>
  );
}

export default LeaderboardView;