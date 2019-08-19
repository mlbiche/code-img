import React from 'react';
import PropTypes from 'prop-types';
import DiscussionResponse from '../DiscussionResponse/DiscussionResponse';
import UploadImage from '../UploadImage/UploadImage';

import './DiscussionView.css';

// Mock up Discussions object constants
const MOCKUP_DISCUSSIONS = [
  {
    id: 0,
    responses: [
      { id: 0, username: 'Krystine', date: new Date(), img: 'image1', reactions: [] },
      { id: 1, username: 'Ern', date: new Date(), img: 'image2', reactions: [] },
      { id: 2, username: 'Krystine', date: new Date(), img: 'image3', reactions: [] }
    ]
  },
  {
    id: 1,
    responses: [
      { id: 3, username: 'Cody', date: new Date(), img: 'image4', reactions: [] },
      { id: 4, username: 'Blaine', date: new Date(), img: 'image5', reactions: [] }
    ]
  },
  {
    id: 2,
    responses: [
      { id: 5, username: 'Ursella', date: new Date(), img: 'image6', reactions: [] }
    ]
  }
];

/**
 * DiscussionView component
 * @param match The React router match object that contains the discussion id
 *              in the params 
 */
function DiscussionView({ match }) {
  const mockupDiscussion = MOCKUP_DISCUSSIONS[match.params.id];

  return (
    <div className="discussion-responses-container">
      {/* Display all the discussion response in different DiscussionResponse components */}
      {mockupDiscussion.responses.map((response) => (
        <DiscussionResponse
          username={response.username}
          date={response.date}
          img={response.img}
          reactions={response.reactions}
          key={response.id}
        />
      ))}
      <UploadImage />
    </div>
  );
}

/**
 * Define the component property types
 * It expect the react-router match property, containing a object params with
 * a id key.
 */
DiscussionView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired
};

export default DiscussionView;