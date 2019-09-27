import React, { Component } from 'react';
import Discussion from '../Discussion/Discussion';
import FrontPageNavBar from '../FrontPageNavBar/FrontPageNavBar';
import './FrontPageView.css';
import { Container, Col, Row, CardColumns } from 'react-bootstrap';

class FrontPageView extends Component {
  constructor(props) {
    super(props);

    this.state = { discussions: [] };
  }

  render() {
    return (
      <Container className="main-container" >
        <Row>
          <Col>
            <FrontPageNavBar />
          </Col>
        </Row>
        <Row>
          <Col className="main-title-col">
            <h2>Discussions</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <CardColumns>
              {
                this.state.discussions.map((discussion) => (
                  <Discussion
                    id={discussion._id}
                    username={discussion.firstResponse.user.username}
                    date={discussion.firstResponse.date}
                    image={discussion.firstResponse.imageUrl}
                    key={discussion.id}
                  />
                ))
              }
            </CardColumns>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FrontPageView;