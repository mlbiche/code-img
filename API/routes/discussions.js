/**
 * GET /discussions endpoint callback
 * 
 * List a page of discussions
 */

const { validationResult } = require('express-validator');
const { Discussion } = require('../model/schema/discussion');

/**
 * GET /discussions endpoint callback
 * List a page of discussions
 * @param req The request. It contains the page number and the page size in the query
 * @param res The response. 200 on success with the discussion list as JSON, 500 if internal error
 */
module.exports = async (req, res) => {
  /**
   * Check if validation has failed
   * 
   * Developped using https://express-validator.github.io/docs/index.html#basic-guide
   */
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Display the error in the API console
    console.log('GET /discussions validation failed : sending 422 HTTP code...');
    console.log(errors.array());

    // Send back a 422 HTTP Error code (Unprocessable entity)
    return res.status(422).end();
  }

  const pageNum = parseInt(req.query.pageNum);
  const pageSize = parseInt(req.query.pageSize);

  console.log(`GET /discussions (page: ${pageNum} / size: ${pageSize})`);

  try {
    /**
     * Get the discussions from the most recent to the latest one and only collect
     * the first response only
     * 
     * Developped using https://docs.mongodb.com/manual/reference/operator/aggregation/arrayElemAt/
     * and https://mongoosejs.com/docs/api/aggregate.html
     */
    const discussions = await Discussion.aggregate()
      .project({
        firstResponse: { $arrayElemAt: ['$responses', 0] }
      }) // Select only the first response of the discussion
      .addFields({
        'firstResponse.date': { $toDate: '$firstResponse._id' }
      }) // Add the date field
      .sort({ 'firstResponse.date': -1 }) // Sort the discussions from the most recent to the latest
      .skip(pageSize * (pageNum - 1)) // Skip the discussions of the previous pages
      .limit(pageSize); // Limit the number of discussions to the page size

    // Compute the total number of pages
    const pageMax = Math.ceil((await Discussion.countDocuments()) / pageSize);

    // Send back the discussion list as JSON
    res.status(200).json({
      discussions: discussions,
      pageNum: pageNum,
      pageSize: pageSize,
      pageMax: pageMax
    });
  } catch (err) {
    console.log(`Discussion aggregation failure : internal error...`);
    console.log(err);

    // Send Internal Server Error 500 Error HTTP code
    res.status(500).end();
  }
};