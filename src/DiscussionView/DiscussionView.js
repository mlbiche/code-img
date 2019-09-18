import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import DiscussionResponse from '../DiscussionResponse/DiscussionResponse';
import UploadImage from '../UploadImage/UploadImage';

import './DiscussionView.css';

// Mock up Discussions object constants
export const MOCKUP_DISCUSSIONS = [
  {
    id: 0,
    responses: [
      {
        id: 0,
        username: 'Krystine',
        date: new Date(),
        img: require('../mock-img/books-3733892_640.jpg'),
        reactions: []
      },
      {
        id: 1,
        username: 'Ern',
        date: new Date(),
        img: require('../mock-img/mountain-4387827_640.jpg'),
        reactions: []
      },
      {
        id: 2,
        username: 'Krystine',
        date: new Date(),
        img: require('../mock-img/nature-4353699_640.jpg'),
        reactions: []
      }
    ]
  },
  {
    id: 1,
    responses: [
      {
        id: 0,
        username: 'Cody',
        date: new Date(),
        img: require('../mock-img/plane-4301615_640.png'),
        reactions: []
      },
      {
        id: 1,
        username: 'Blaine',
        date: new Date(),
        img: require('../mock-img/sunset-4405820_640.jpg'),
        reactions: []
      }
    ]
  },
  {
    id: 2,
    responses: [
      {
        id: 0,
        username: 'Ursella',
        date: new Date(),
        img: require('../mock-img/the-feather-of-a-bird-4395771_640.jpg'),
        reactions: []
      }
    ]
  },
  {
    id: 3,
    responses: [
      {
        id: 0,
        username: 'Ursella',
        date: new Date(),
        img: require('../mock-img/sunset-4405820_640.jpg'),
        reactions: []
      }
    ]
  },
  {
    id: 4,
    responses: [
      {
        id: 0,
        username: 'Ursella',
        date: new Date(),
        img: require('../mock-img/the-feather-of-a-bird-4395771_640.jpg'),
        reactions: []
      }
    ]
  },
  {
    id: 5,
    responses: [
      {
        id: 0,
        username: 'Ursella',
        date: new Date(),
        img: require('../mock-img/mountain-4387827_640.jpg'),
        reactions: []
      }
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
    <Container className="main-container">
      <Row className="discussion-view-row">
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
        <Col lg={7} xs={12} className="discussion-view-upload-img-col">
          <UploadImage />
        </Col>
      </Row>
    </Container>
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