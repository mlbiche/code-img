import React from 'react';
import UserScore, { UPLOAD_SCORE, REACTION_SCORE } from '../UserScore/UserScore';

import './LeaderboardView.css';

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
    // <div id="learderboard-container">
    //   <h2 id="learderboard-title">Leaderboard</h2>
    //   <h3>Best uploaders</h3>
    // {/* Display all the upload scores in different UserScore components */}
    //   {MOCKUP_UPLOAD_SCORES.map((mockupUploadScore) => (
    //     <UserScore
    //       type={UPLOAD_SCORE}
    //       username={mockupUploadScore.username}
    //       score={mockupUploadScore.score}
    //       key={mockupUploadScore.id}
    //     />
    //   ))}
    //   <h3>Most appreciated</h3>
    //   {/* Display all the reaction scores in different UserScore components */}
    //   {MOCKUP_REACTION_SCORES.map((mockupReactionScore) => (
    //     <UserScore
    //       type={REACTION_SCORE}
    //       username={mockupReactionScore.username}
    //       score={mockupReactionScore.score}
    //       key={mockupReactionScore.id}
    //     />
    //   ))}
    // </div>
    <div class="container learderboard-container">
      <div class="row">
        <div class="col">
          <h3>Best uploaders</h3>
          {/* Display all the upload scores in different UserScore components */}
          {MOCKUP_UPLOAD_SCORES.map((mockupUploadScore) => (
            <UserScore
              type={UPLOAD_SCORE}
              username={mockupUploadScore.username}
              score={mockupUploadScore.score}
              key={mockupUploadScore.id}
            />
          ))}
        </div>
      </div>
      <div class="row">
        <div class="col">
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
        </div>
      </div>
      </div>
      );
    }
    
export default LeaderboardView;