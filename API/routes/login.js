/**
 * POST /login endpoint callback
 * 
 */

const { validationResult } = require('express-validator');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { User } = require('../model/schema/user');
const CredentialsMismatchError = require('../common/errors/credentialsMismatchError');

/**
 * POST /login endpoint callback
 * @param req The request. It must contains :
 *   - email : string, the user email
 *   - password : string, the hashed salted password
 * @param res The response. 200 on success, 422 if invalid request, 401 if invalid credentials, 500 if internal error
 */
module.exports = async (req, res) => {
  /**
   * Check if validation has failed
   * 
   * Developped using https://express-validator.github.io/docs/index.html#basic-guide
   */
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Display the error in the API console
    console.log('POST /login validation failed : sending 422 HTTP code...');

    // Send back a 422 HTTP Error code (Unprocessable entity)
    return res.status(422).json({ errors: errors.array() });
  }

  // The request has been validated and can be processed
  console.log(`POST /login (email: ${req.body.email})`);

  try {
    /**
     * If the credentials match, generate a JSON Web Token
     * If not, the method fails, raise an error which is later caught (l. 49)
     */
    const userId = await checkCredentials(req.body.email, req.body.password);

    const token = await generateToken(userId);

    console.log(`Connection success (email: ${req.body.email})!`);

    /**
     * Send the generated token in a Set-Cookie HTTP packet
     * The cookie is only accessible from HTTP (so it is protected from JS injection)
     * 
     * Developped using https://expressjs.com/en/4x/api.html#res.cookie
     */
    res.cookie('sessionToken', token, { maxAge: 12 * 60 * 60 * 1000, httpOnly: true });
    res.end();
  } catch (err) {
    // Check the caught error
    switch (err.name) {
      case CredentialsMismatchError.name:
        // The login has failed because of a credentials mismatch
        console.log(`Connection failure : credentials mismatch (email: ${req.body.email})...`);

        // Send Unauthorized 401 HTTP code
        res.status(401).end();
        break;
      default:
        // The login has failed for an other reason (e.g. DB access failure, ...)
        console.log(`Connection failure : internal error (email: ${req.body.email})...`);

        // Send Internal Server Error 500 Error HTTP code
        res.status(500).end();
        break;
    }
  }
}

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