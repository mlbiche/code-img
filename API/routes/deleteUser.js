const { User } = require('../model/schema/user');

module.exports = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.userId })
   // successful delete the user with the specified id
    await res.status(202).end();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }

};