import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CommonNavbar from './CommonNavbar/CommonNavbar';
import LeaderboardView from './LeaderboardView/LeaderboardView';

function App() {
  return (
    /**
     * Use the router component from react-router-dom module to define
     * the different available routes
     */
    <Router>
      {/* Add the CommonNavbar component as it is present in all views */}
      <CommonNavbar />

      {/* Define the different routes */}
      <Route exact path='/' /> {/* TODO : Add Front Page component */}
      <Route exact path='/discussion/:id' /> {/* TODO : Add discussion component */}
      <Route exact path='/leaderboard' component={LeaderboardView} />
    </Router>
  );
}

export default App;
