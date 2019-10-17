/**
 * DiscussionService
 * 
 * Define all API fetch linked to discussions
 */

import { API_URL } from './servicesEnvironment';

/**
 * Get discussions of a given page
 * @param pageNum The page number
 * @param pageSize The page size
 * @return An object containing the discussion array and the maximum page number
 *         Throw an error on fetch failure, on json parsing failure or on back-end failure
 */
export async function getDiscussionsPage(pageNum, pageSize) {
  /**
   * Prepare the URL with page parameters
   * 
   * Developped using https://fetch.spec.whatwg.org/#fetch-api
   */
  const url = new URL(API_URL + 'discussions');
  const params = { pageNum: pageNum, pageSize: pageSize };

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  try {
    // Fetch the discussions
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    // If the data is properly fetched
    if (res.status === 200) {
      const resObj = await res.json();

      // Update all dates to JS Date objects
      resObj.discussions.map(discussion => {
        discussion.firstResponse.date = new Date(discussion.firstResponse.date);
        return discussion;
      });

      return {
        discussions: resObj.discussions,
        pageMax: resObj.pageMax
      };
    }

    throw new Error('Fetching responses has failed');
  } catch (err) {
    throw err;
  }
}

/**
 * Get the response list associated to a discussion ID
 * @param discussionId The discussion ID
 * @return The responses array
 *         Throw an error on fetch failure, on json parsing failure or on back-end failure
 */
export async function getDiscussionResponses(discussionId) {
  try {
    const res = await fetch(API_URL + `discussion/${discussionId}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    });

    // If the data is properly fetched
    if (res.status === 200) {
      const resObj = await res.json();

      // Convert the text date to a JavaScript Date object in each response object
      resObj.responses.map(response => {
        response.date = new Date(response.date);
        return response;
      });

      return resObj.responses;
    }

    throw new Error('Fetching responses has failed');
  } catch (err) {
    throw err
  }
}