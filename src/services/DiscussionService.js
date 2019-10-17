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
 * @return An object containing the status code and the discussion array. The discussion array is empty
 *         if the status code is not 200. Throw an error on fetch or json parsing failure
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
        statusCode: res.status,
        discussions: resObj.discussions,
        pageMax: resObj.pageMax
      };
    }

    return {
      statusCode: res.status,
      discussion: []
    };
  } catch (err) {
    throw err;
  }
}