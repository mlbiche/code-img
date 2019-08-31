/**
 * POST /login endpoint
 * 
 * Routing developped using https://expressjs.com/en/4x/api.html#router
 */

/**
 * POST /login endpoint
 * req must contains :
 *   - email : string, the user email
 *   - password : string, the hashed salted password
 * @param router The server router to which the route is added
 */
module.exports = (router) => {
  router.post('/login', (req, res) => {
      // TODO : Implement the /login endpoint
    });
};