const { User } = require('../../model');
const jwt = require('jsonwebtoken');

/**
 * Check the provided credentials for user login
 * @param email The user email
 * @param password The hashed salted password
 * @return The generated token if logging in succeed, an empty string otherwise
 */
module.exports = (email, password) => {
  // Search for a user in the database with the corresponding 
  User.findOne({ email: email, password: password }, (err, matchedUser) => {
    if (err) {
      console.log(`Connection failure (email: ${email})...`);

      return '';
    }

    // Generate random secret key for encrypting the JSON Web Token
    const key = require('crypto').randomBytes(64).toString('hex');

    // Encrypt the JSON Web Token using the user ID
    const token = jwt.sign({ userId: matchedUser._id }, key);

    console.log(`Connection success (userId: ${matchedUser._id})!`);

    return token;
  });
};