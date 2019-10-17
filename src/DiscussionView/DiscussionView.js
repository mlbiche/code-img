/**
 * DiscussionView component
 * 
 * Display a discussion thread
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import DiscussionResponse from '../DiscussionResponse/DiscussionResponse';

/**
 * DiscussionView component
 * @param props 
 *    - The React router match object that contains the discussion id in the params 
 */
class DiscussionView extends Component {
  constructor(props) {
    super(props);
    
    this.state = { responses: [] };
  }

  /**
   * Load the response list of the discussion before rendering
   * 
   * Developped using https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
   */
  componentDidMount() {
    fetch(
      `http://localhost:8080/discussion/${this.props.match.params.id}`,
      {
        method: 'GET',
        headers: { 'Content-type': 'application/json' }
      })
      .then(res => {
        switch (res.status) {
          case 200:
            return res.json();
          default:
            throw new Error('Fetching responses has failed');
        }
      })
      .then(resObj => {
        // Convert the text date to a JavaScript Date object in each response object
        resObj.responses.map(response => {
          response.date = new Date(response.date);
          return response;
        });

        this.setState({ responses: resObj.responses });
      });
  }

  render() {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          {/* Display all the discussion response in different DiscussionResponse components */}
          {this.state.responses.map((response) => (
            <DiscussionResponse
              username={response.user.username}
              date={response.date}
              img={response.imageUrl}
              reactions={[]}
              key={response._id}
            />
          ))}
        </Row>
      </Container>
    );
  }
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