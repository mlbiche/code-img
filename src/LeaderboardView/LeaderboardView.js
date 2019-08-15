import React from 'react';
import UserScore from '../UserScore/UserScore';

import './LeaderboardView.css';

function LeaderboardView() {
  return (
    <div id="learderboard-container">
      <h2 id="learderboard-title">Leaderboard</h2>
      <h3>Best uploaders</h3>
      <UserScore type="upload-score" username="Krystine" score={20} />
      <UserScore type="upload-score" username="Irma" score={14} />
      <UserScore type="upload-score" username="Maureen" score={13} />
      <UserScore type="upload-score" username="Ursella" score={6} />
      <UserScore type="upload-score" username="Sherley" score={5} />
      <h3>Most appreciated</h3>
      <UserScore type="reaction-score" username="Lexus" score={46} />
      <UserScore type="reaction-score" username="Ern" score={43} />
      <UserScore type="reaction-score" username="Blaine" score={34} />
      <UserScore type="reaction-score" username="Cody" score={30} />
      <UserScore type="reaction-score" username="Mario" score={22} />
    </div>
  );
}

export default LeaderboardView;