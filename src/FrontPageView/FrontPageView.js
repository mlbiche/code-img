import React, { Component } from 'react';
import Discussion from '../Discussion/Discussion';
import FrontPageNavBar from '../FrontPageNavBar/FrontPageNavBar';
import './FrontPageView.css';
import { Container, Col, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

const PAGE_INIT_NUM = 1;
const PAGE_SIZE = 30;

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
    /**
     * Prepare the URL with page parameters
     * 
     * Developped using https://fetch.spec.whatwg.org/#fetch-api
     */
    const url = new URL('http://localhost:8080/discussions');
    const params = { pageNum: this.state.pageNum, pageSize: this.state.pageSize };

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
      .then(resObj => {
        // Update all dates to JS Date objects
        resObj.discussions.map(discussion => {
          discussion.firstResponse.date = new Date(discussion.firstResponse.date);
          return discussion;
        });

        // Update the state with the received discussions and the pageMax
        this.setState(
          {
            discussions: resObj.discussions,
            pageMax: resObj.pageMax
          },
          () => { window.scrollTo(0, 0); }
        );
      })
      .catch(err => {
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
        <Row>
          <Col className='front-page-pagination-col'>
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