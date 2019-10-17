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
module.exports = (req, res) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then(result => {
      // The user with the specified ID has been successfully deleted
      res.status(202).end();
    })
    .catch(err => {
      console.log(err);

      // Return HTTP erro code 500
      res.status(500).json({
        error: err
      });
    });
};