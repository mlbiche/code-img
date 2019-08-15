import React from 'react';
import UserScore, { UPLOAD_SCORE, REACTION_SCORE } from '../UserScore/UserScore';

import './LeaderboardView.css';

function LeaderboardView() {
  return (
    <div id="learderboard-container">
      <h2 id="learderboard-title">Leaderboard</h2>
      <h3>Best uploaders</h3>
      <UserScore type={UPLOAD_SCORE} username="Krystine" score={20} />
      <UserScore type={UPLOAD_SCORE} username="Irma" score={14} />
      <UserScore type={UPLOAD_SCORE} username="Maureen" score={13} />
      <UserScore type={UPLOAD_SCORE} username="Ursella" score={6} />
      <UserScore type={UPLOAD_SCORE} username="Sherley" score={5} />
      <h3>Most appreciated</h3>
      <UserScore type={REACTION_SCORE} username="Lexus" score={46} />
      <UserScore type={REACTION_SCORE} username="Ern" score={43} />
      <UserScore type={REACTION_SCORE} username="Blaine" score={34} />
      <UserScore type={REACTION_SCORE} username="Cody" score={30} />
      <UserScore type={REACTION_SCORE} username="Mario" score={22} />
    </div>
  );
}

export default LeaderboardView;