import React from 'react';
import Discussion from '../Discussion/Discussion';
import FrontPageNavBar from '../FrontPageNavBar/FrontPageNavBar';
import './FrontPageView.css';
import { Container, Col, Row } from 'react-bootstrap';

const MOCKUP_DISCUSSIONS = [];

function FrontPageView() {
  return (
    <Container>
      <Row>
        <Col className="frontpage-title-col">
          <FrontPageNavBar />
        </Col>
      </Row>
      <Row>
        <Col className="frontpage-title-col">
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
    </Container >
  );
}

export default FrontPageView;