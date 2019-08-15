import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CommonNavbar from './CommonNavbar/CommonNavbar';
import LeaderboardView from './LeaderboardView/LeaderboardView';

function App() {
  return (
    <Router>
      <CommonNavbar />

      <Route exact path='/' /> {/* TODO : Add Front Page component */}
      <Route exact path='/discussion/:id' /> {/* TODO : Add discussion component */}
      <Route exact path='/leaderboard' component={LeaderboardView} />
    </Router>
  );
}

export default App;
