/**
 * DiscussionView component
 * 
 * Display a discussion thread
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import DiscussionResponse from '../DiscussionResponse/DiscussionResponse';
import { getDiscussionResponses } from '../services/DiscussionService';

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
    getDiscussionResponses(this.props.match.params.id)
      .then(responses => {
        this.setState({ responses: responses });
      })
      .catch(err => {
        console.log('getDiscussionResponses error');
        console.log(err.message);
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
              img={response.imgUrl}
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