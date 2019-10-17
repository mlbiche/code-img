/**
 * FrontPageView component
 * 
 * Define the FrontPageView component containing the discussions
 */
import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Discussion from '../Discussion/Discussion';
import FrontPageNavBar from '../FrontPageNavBar/FrontPageNavBar';
import { getDiscussionsPage } from '../services/DiscussionService';

import './FrontPageView.css';

const PAGE_INIT_NUM = 1;
const PAGE_SIZE = 15;

/**
 * FontPageView component
 */
class FrontPageView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      discussions: [],
      pageNum: PAGE_INIT_NUM,
      pageSize: PAGE_SIZE,
      pageMax: 0
    };

    this.updatePage = this.updatePage.bind(this);
    this.fetchDiscussions = this.fetchDiscussions.bind(this);
  }

  /**
   * Load the first page of discussions before rendering
   * 
   * Developped using https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
   */
  componentDidMount() {
    this.fetchDiscussions();
  }

  /**
   * Fetch the discussions from the page stored in the state
   */
  fetchDiscussions() {
    getDiscussionsPage(this.state.pageNum, this.state.pageSize)
      .then(({ statusCode, discussions, pageMax }) => {
        if (statusCode === 200) {
          // Update the state with the received discussions and the pageMax
          this.setState(
            {
              discussions: discussions,
              pageMax: pageMax
            },
            () => { window.scrollTo(0, 0); }
          );
        } else {
          throw new Error('Fetching discussions has failed');
        }
      })
      .catch(err => {
        console.log('Discussions fetch error');
        console.log(err.message);
      });
  }

  /**
   * Update the selected page number and fetch the discussions from this new page
   * 
   * @param pageNumObj The object that contains the new selected page number
   */
  updatePage(pageNumObj) {
    this.setState(
      { pageNum: pageNumObj.selected + 1 },
      this.fetchDiscussions
    );
  }

  render() {
    return (
      <Container id="front-page-container">
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
        {/* Discussion list */}
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
        {/* Pagination */}
        <Row>
          <Col className="front-page-pagination-col">
            {/*
              Developed using https://www.npmjs.com/package/react-paginate and 
              https://github.com/AdeleD/react-paginate/blob/master/demo/js/demo.js
            */}
            <ReactPaginate
              pageCount={this.state.pageMax}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              previousLabel={'‹'}
              nextLabel={'›'}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              previousClassName={'page-item'}
              nextClassName={'page-item'}
              breakClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousLinkClassName={'page-link'}
              breakLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              activeClassName={'active'}
              onPageChange={this.updatePage}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FrontPageView;