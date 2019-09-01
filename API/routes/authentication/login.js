/**
 * POST /login endpoint
 * 
 * Routing developped using https://expressjs.com/en/4x/api.html#router
 * Validation developped using https://express-validator.github.io/docs/index.html
 */

const { body, validationResult } = require('express-validator');
const loginMethod = require('../../method/authentication/login');
const { CredentialsMismatchError } = require('../../common/errors');

/**
 * POST /login endpoint
 * req must contains :
 *   - email : string, the user email
 *   - password : string, the hashed salted password
 * @param router The server router to which the route is added
 */
module.exports = (router) => {
  router.post('/login',
    // Validate request body
    [
      body('email').isEmail(),
      body('password').not().isEmpty()
    ],
    async (req, res) => {
      // Check if validation has failed. Send a 422 HTTP Error code if it has
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log('POST /login validation failed : sending 422 HTTP code...');
        return res.status(422).json({ errors: errors.array() });
      }

      console.log(`POST /login (email: ${req.body.email})`);

      try {
        const token = await loginMethod(req.body.email, req.body.password);

        console.log(`Connection success (email: ${req.body.email})!`);
      } catch (err) {
        switch (err.name) {
          case CredentialsMismatchError.name:
            console.log(`Connection failure : credentials mismatch (email: ${req.body.email})...`);

            // Send Unauthorized HTTP code on credentials mismatch
            res.status(401).end();
            break;
          default:
            console.log(`Connection failure : internal error (email: ${req.body.email})...`);

            // Send Internal Error HTTP code
            res.status(500).end();
            break;
        }
      }
    });
};