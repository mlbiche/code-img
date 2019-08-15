import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CommonNavbar from './CommonNavbar/CommonNavbar';

function App() {
  return (
    <Router>
      <CommonNavbar />

      <Route exact path='/' /> {/* TODO : Add Front Page component */}
      <Route exact path='/discussion/:id' /> {/* TODO : Add discussion component */}
      <Route exact path='/leaderboard' /> {/* TODO : Add leaderboard component */}
    </Router>
  );
}

export default App;
