import React from 'react';
import Discussion from '../Discussion/Discussion';
import { MOCKUP_DISCUSSIONS } from '../DiscussionView/DiscussionView';
import FrontPageNavBar from '../FrontPageNavBar/FrontPageNavBar';
import { Container, Col, Row } from 'react-bootstrap';

import './FrontPageView.css';

function FrontPageView() {
  return (
    <Container id="front-page-container">
      <Row>
        <Col>
          <FrontPageNavBar />
        </Col>
      </Row>
      <Row>
        <Col id="discussion-title-col">
          <h2>Discussions</h2>
        </Col>
      </Row>
      <Row>
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
      </Row>
    </Container>
  );
}

export default FrontPageView;