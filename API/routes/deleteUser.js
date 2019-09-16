const { User } = require('../model/schema/user');

module.exports = (req, res) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {// successful delete the user with the specified id
            res.status(200).json({
                message: 'User deleted successfully'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};