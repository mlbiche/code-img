/**
 * GET /discussion/:discussionId endpoint callback
 * 
 * List all responses of of the discussion :discussionId
 */

const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { Discussion } = require('../model/schema/discussion');

/**
 * GET /discussion/:discussionId endpoint callback
 * List all responses of of the discussion :discussionId
 * @param req The request. It must contains the discussionId in the params
 * @param res The response. 200 on success with the response list as JSON, 404 if the discussion is not found, 500 if internal error
 */
module.exports = (req, res) => {
  /**
   * Check if validation has failed
   * 
   * Developped using https://express-validator.github.io/docs/index.html#basic-guide
   */
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Display the error in the API console
    console.log('GET /discussion/:discussionId validation failed : sending 422 HTTP code...');
    console.log(errors.array());

    // Send back a 422 HTTP Error code (Unprocessable entity)
    return res.status(422).end();
  }

  const discussionId = new mongoose.Types.ObjectId(req.params.discussionId);

  console.log(`GET /discussion/${discussionId}`);

  /**
   * Find the corresponding discussion
   * Add a date field to each response, computed from the response _id
   * 
   * Developped using https://stackoverflow.com/a/43952287
   */
  Discussion.aggregate()
    .match({ _id: discussionId })
    .addFields({
      'responses': {
        '$map': {
          'input': '$responses',
          'as': 'response',
          'in': {
            '_id': '$$response._id',
            'user': '$$response.user',
            'imageUrl': '$$response.imageUrl',
            'date': { $toDate: '$$response._id' } // The added date field
          }
        }
      }
    })
    .exec()
    .then(discussions => {
      if (discussions.length === 0) {
        // The discussion does not exist. Display the error in the API console
        console.log(`Discussion ${discussionId} not found : sending 404 HTTP code...`);

        return res.status(404).end();
      }
      else {
        const discussion = discussions[0];

        // Send the discussion back as a JSON object
        res.status(200).json(discussion);
      }
    })
    .catch(err => {
      console.log(`Discussion aggregation failure : internal error...`);

      // An internal error happened
      return res.status(500).end();
    });
}