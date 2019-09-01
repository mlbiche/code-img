/**
 * Login method
 * Check that the provided username and the password match with a database document.
 * If so, generate the signed JSON Web Token and return it.
 * 
 * JWT generation developped using https://www.npmjs.com/package/jsonwebtoken#usage
 */

const { User } = require('../../model');
const jwt = require('jsonwebtoken');
const { CredentialsMismatchError } = require('../../common/errors');

/**
 * Check the provided credentials for user login
 * @param email The user email
 * @param password The hashed salted password
 * @return The generated token if logging in succeed, an empty string otherwise
 */
module.exports = async (email, password) => {
  try {
    // Search for a user in the database with the corresponding 
    const user = await User.findOne({ email: email, password: password })
    // Throw a CredentialsMismatchError on failure
      .orFail(new CredentialsMismatchError());

    // Generate random secret key for encrypting the JSON Web Token
    const secretKey = require('crypto').randomBytes(64).toString('hex');

    // Update the user with the generated secret key
    await User.updateOne({ _id: user._id }, { secretKey: secretKey })
      .orFail(new Error('Secret key update failure'));

    // Encrypt the JSON Web Token using the user ID valid for 12 hours
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "12h" });

    return token;
  } catch (err) {
    // Propagate the error
    throw err;
  }
};