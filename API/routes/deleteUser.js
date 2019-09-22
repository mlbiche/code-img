const { User } = require('../model/schema/user');

module.exports = (req, res) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {// successful delete the user with the specified id
      res.status(202);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};