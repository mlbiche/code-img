import React from 'react';
import Discussion from '../Discussion/Discussion';

import './FrontPageView.css'

const MOCKUP_DISCUSSIONS = [
  { username: 'Krystine', date: new Date(), image: require('../mock-img/books-3733892_640.jpg') },
  { username: 'Irma', date: new Date(), image: require('../mock-img/mountain-4387827_640.jpg') },
  { username: 'Maureen', date: new Date(), image: require('../mock-img/nature-4353699_640.jpg') },
  { username: 'Ursella', date: new Date(), image: require('../mock-img/plane-4301615_640.png') },
  { username: 'Sherley', date: new Date(), image: require('../mock-img/sunset-4405820_640.jpg') }
];

function FrontPageView() {
  return (
    <div id="front-page-container">
      <div id="front-page-title">
        <h2>Discussions</h2>
      </div>
      <div id="front-page-discussions-container">
        {
          MOCKUP_DISCUSSIONS.map((mockup_discussion) => (
            <Discussion
              username={mockup_discussion.username}
              date={mockup_discussion.date}
              image={mockup_discussion.image} />
          ))
        }
      </div>
    </div>
  );
}

export default FrontPageView;