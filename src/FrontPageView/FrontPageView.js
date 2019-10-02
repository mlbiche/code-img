import React, { Component } from 'react';
import Discussion from '../Discussion/Discussion';
import FrontPageNavBar from '../FrontPageNavBar/FrontPageNavBar';
import './FrontPageView.css';
import { Container, Col, Row } from 'react-bootstrap';

const PAGE_INIT_NUM = 1;
const PAGE_SIZE = 20;

class FrontPageView extends Component {
  constructor(props) {
    super(props);

    this.state = { discussions: [] };
  }

  /**
   * Load the first page of discussions before rendering
   * 
   * Developped using https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
   */
  componentDidMount() {
    /**
     * Prepare the URL with page parameters
     * 
     * Developped using https://fetch.spec.whatwg.org/#fetch-api
     */
    const url = new URL('http://localhost:3000/discussions');
    const params = { pageNum: PAGE_INIT_NUM, pageSize: PAGE_SIZE };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    // Fetch the discussions
    fetch(url,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(res => {
        // Check the response status
        switch (res.status) {
          case 200:
            // If response has succeeded, parse the JSON response
            return res.json();
          default:
            throw new Error('Fetching discussions has failed');
        }
      })
      .then(resJson => {
        // Update all dates to JS Date objects
        resJson.map(discussion => {
          discussion.firstResponse.date = new Date(discussion.firstResponse.date);
          return discussion;
        });

        // Update the state with the received discussions
        this.setState({ discussions: resJson });

      })
      .catch(err => {
        console.log(err.message);
      });
  }

  render() {
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
            this.state.discussions.map((discussion) => (
              <Discussion
                id={discussion._id}
                username={discussion.firstResponse.user.username}
                date={discussion.firstResponse.date}
                image={discussion.firstResponse.imageUrl}
                key={discussion._id}
              />
            ))
          }
        </Row>
      </Container>
    );
  }
}

export default FrontPageView;