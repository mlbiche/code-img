/**
 * GET /discussions endpoint callback
 * 
 * List all discussions
 */

const { Discussion } = require('../model/schema/discussion');

/**
 * GET /discussions endpoint callback
 * List all discussions
 * @param req The request
 * @param res The response. 200 on success with the discussion list as JSON, 500 if internal error
 */
module.exports = async (req, res) => {
  console.log(`GET /discussions`);

  try {
    /**
     * Get the discussions from the most recent to the latest one and only collect
     * the first response only
     * 
     * Developped using https://docs.mongodb.com/manual/reference/operator/aggregation/arrayElemAt/
     * and https://mongoosejs.com/docs/api/aggregate.html
     */
    const discussions = await Discussion.aggregate([
      {
        $project: {
          firstResponse: { $arrayElemAt: ["$responses", 0] }
        }
      }
    ]).sort({ _id: -1 });

    // Send back the discussion list as JSON
    res.status(200).json(discussions);
  } catch (err) {
    console.log(`Discussion aggregation failure : internal error...`);
    console.log(err);

    // Send Internal Server Error 500 Error HTTP code
    res.status(500).end();
  }
};