/**
 * Login method
 * Check that the provided username and password match with a database document.
 * If so, generate the signed JSON Web Token and return it.
 */

const argon2 = require('argon2');
const { User } = require('../model/schema/user');
const jwt = require('jsonwebtoken');
const CredentialsMismatchError = require('../common/errors/credentialsMismatchError');

/**
 * Check the provided credentials for user login
 * @param email The user email
 * @param password The hashed salted password
 * @return The generated token if logging in succeed, an empty string otherwise
 */
module.exports = async (email, password) => {
  try {
    const userId = await checkCredentials(email, password);

    return await generateToken(userId);
  } catch (err) {
    // Propagate the error
    throw err;
  }
};

/**
 * Check that the provided email matches a user and that the provided
 * password is correct
 * @param email The user email
 * @param password The user password
 * @returns the matched user id if success ; Raise a CredentialsMismatcheError on failure
 */
async function checkCredentials(email, password) {
  try {
    // Search for a user in the database with the corresponding 
    const user = await User.findOne({ email: email })
    // Throw a CredentialsMismatchError when user is not found
      .orFail(new CredentialsMismatchError());
  
    /**
     * Check if the password matches to the hashed password
     * Passwords are hashed using Argon2 algorithm
     * 
     * Developped using https://www.npmjs.com/package/argon2#usage
     */
    if (!await argon2.verify(user.password, password))
      throw new CredentialsMismatchError();

    return user._id;
  } catch (err) {
    // Propagate the error
    throw err;
  }
}

/**
 * Generate a JSON Web Token using the user ID, valid for 12 hours
 * Store the used secretKey in the user document in the database
 * @param userId The matched user ID
 * @returns The generated token if success ; Raise an Error on failure
 */
async function generateToken(userId) {
  try {
    // Generate random secret key for encrypting the JSON Web Token
    const secretKey = require('crypto').randomBytes(64).toString('hex');
  
    // Update the user with the generated secret key
    await User.updateOne({ _id: userId }, { secretKey: secretKey })
    // Throw an Error when the MongoDB query fails
      .orFail(new Error('Secret key update failure'));
  
    /**
     * Encrypt the JSON Web Token using the user ID valid for 12 hours
     * 
     * Developped using https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
     */
    return jwt.sign({ userId: userId }, secretKey, { expiresIn: "12h" });
  } catch (err) {
    // Propagate the error
    throw err;
  }
}