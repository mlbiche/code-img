import React from 'react';
import Discussion from '../Discussion/Discussion';
import { MOCKUP_DISCUSSIONS } from '../DiscussionView/DiscussionView';
import FrontPageNavBar from '../FrontPageNavBar/FrontPageNavBar';
import './FrontPageView.css';
import { Container, Col, Row, CardColumns } from 'react-bootstrap';

function FrontPageView() {
  return (
    // <div>
    //   {/* <FrontPageNavBar />
    //   <div id="front-page-container">
    //     <div id="front-page-title">
    //       <h2>Discussions</h2> */}
    //     {/* </div>
    //     <div id="front-page-discussions-container">
    //       {
    //         MOCKUP_DISCUSSIONS.map((mockup_discussion) => (
    //           <Discussion
    //             id={mockup_discussion.id}
    //             username={mockup_discussion.responses[0].username}
    //             date={mockup_discussion.responses[0].date}
    //             image={mockup_discussion.responses[0].img}
    //             key={mockup_discussion.id}
    //           />
    //         ))
    //       }
    //     </div> */}
    // //   </div>
    // // </div>
    <Container className="main-container">
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
        </CardColumns>
      </Col>
    </Row>
  </Container>
);
 }
//   );
// }

export default FrontPageView;