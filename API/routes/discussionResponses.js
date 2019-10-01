const { Discussion } = require('../model/schema/discussion');

module.exports = (req, res) => {
  const discussionId = req.params.discussionId;

  Discussion.find({ _id: discussionId })
    .exec()
    .then(discussions => {
      if (discussions.length == 0) {
        return res.status(404).end();
      }
      else {
        const discussion = discussions[0];
        //send it to endback
        res.status(200).json(discussion);
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
}