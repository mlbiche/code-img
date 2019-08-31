/**
 * POST /login endpoint
 * 
 * Routing developped using https://expressjs.com/en/4x/api.html#router
 * Validationd developped using https://express-validator.github.io/docs/index.html
 */

const { body, validationResult } = require('express-validator');

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
    (req, res) => {
      // Check if validation has failed. Send a 422 HTTP Error code if it has
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log('POST /login validation failed : sending 422 HTTP code...');
        return res.status(422).json({ errors: errors.array() });
      }

      console.log(`POST /login. email: ${req.body.email}`);

      // TODO : Implement the /login endpoint
    });
};