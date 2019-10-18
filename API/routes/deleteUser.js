/**
 * DELETE /:userId endpoint callback
 * 
 * Delete a user
 */

const { User } = require('../model/schema/user');

/**
 * POST /login endpoint callback
 * Log in a user
 * @param req The request. It must contains the userId in the params
 * @param res The response. 202 on success, 500 if internal error
 */
module.exports = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.userId });

    // The user with the specified ID has been successfully deleted
    await res.status(202).end();
  } catch (err) {
    console.log(err);

    // Send Internal Server Error 500 Error HTTP code
    res.status(500).end();
  }
};