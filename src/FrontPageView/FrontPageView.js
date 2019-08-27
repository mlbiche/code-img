import React from 'react';
import Discussion from '../Discussion/Discussion';
import { MOCKUP_DISCUSSIONS } from '../DiscussionView/DiscussionView';
import FrontPageNavBar from '../FrontPageNavBar/FrontPageNavBar';
import './FrontPageView.css';

function FrontPageView() {
  return (
    <div>
      <FrontPageNavBar />
      <div id="front-page-container">
        <div id="front-page-title">
          <h2>Discussions</h2>
        </div>
        <div id="front-page-discussions-container">
          {
            MOCKUP_DISCUSSIONS.map((mockup_discussion) => (
              <Discussion
                id={mockup_discussion.id}
                username={mockup_discussion.responses[0].username}
                date={mockup_discussion.responses[0].date}
                image={mockup_discussion.responses[0].img}
                key={mockup_discussion.id}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default FrontPageView;