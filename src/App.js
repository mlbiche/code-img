import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LeaderboardView from './LeaderboardView/LeaderboardView';
import DiscussionView from './DiscussionView/DiscussionView';
import CommonNavbar from './CommonNavbar/CommonNavbar';
import FrontPageView from './FrontPageView/FrontPageView';
import ChallangeCalculateView from './ChallangeCalculateView/ChallangeCalculateView';
import RegistrationView  from './RegistrationView/RegistrationView';
import LoginView from './LoginView/LoginView';


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
      <Route exact path='/' component={FrontPageView} /> 
      <Route exact path='/discussion/:id' component={DiscussionView} />
      <Route exact path='/leaderboard' component={LeaderboardView} />
      <Route exact path='/calculate' component={ChallangeCalculateView} />
      <Route exact path= '/registration' component={RegistrationView} />
      <Route exact path='/login' component={LoginView} />

    </Router>
  );
}

export default App;
