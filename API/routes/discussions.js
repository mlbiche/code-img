/**
 * GET /discussions endpoint callback
 * 
 * List all discussions
 */

const { validationResult } = require('express-validator');
const { Discussion } = require('../model/schema/discussion');

/**
 * GET /discussions endpoint callback
 * List all discussions
 * @param req The request
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
    console.log('GET /discussion validation failed : sending 422 HTTP code...');

    // Send back a 422 HTTP Error code (Unprocessable entity)
    return res.status(422).json({ errors: errors.array() });
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
        firstResponse: { $arrayElemAt: ["$responses", 0] }
      }) // Select only the first response of the discussion
      .addFields({
        'firstResponse.date': { $toDate: '$firstResponse._id' }
      }) // Add the date field
      .sort({ 'firstResponse.date': -1 }) // Sort the discussions from the most recent to the latest
      .skip(pageSize * (pageNum - 1)) // Skip the discussions of the previous pages
      .limit(pageSize); // Limit the number of discussions to the page size

    // Send back the discussion list as JSON
    res.status(200).json(discussions);
  } catch (err) {
    console.log(`Discussion aggregation failure : internal error...`);
    console.log(err);

    // Send Internal Server Error 500 Error HTTP code
    res.status(500).end();
  }
};