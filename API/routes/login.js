/**
 * POST /login endpoint callback
 * 
 */

const { validationResult } = require('express-validator');
const loginMethod = require('../method/login');
const CredentialsMismatchError = require('../common/errors/credentialsMismatchError');

/**
 * POST /login endpoint callback
 * @param req The request. It must contains :
 *   - email : string, the user email
 *   - password : string, the hashed salted password
 * @param res The response
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
    const token = await loginMethod(req.body.email, req.body.password);

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