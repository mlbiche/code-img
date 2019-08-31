/**
 * Authentication endpoints module
 * Provide the router to all authentication endpoints.
 * 
 * Routing developped using https://expressjs.com/en/4x/api.html#router
 */

module.exports = (router) => {
  // Provide the router to all authentication endpoints.
  require('./login')(router);
};