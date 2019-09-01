const { User } = require('../../model');

/**
 * Check the provided credentials for user login
 * @param email The user email
 * @param password The hashed salted password
 */
module.exports = (email, password) => {
  // Search for a user in the database with the corresponding 
  User.find({ email: email, password: password }, (err, matchedUser) => {
    if (err) {
      console.log(err);
      // TODO : Handle connection failure

      return console.log('Connection failure...');
    }

    // TODO : Handle connection success
    console.log('Connection success !');
  });
};