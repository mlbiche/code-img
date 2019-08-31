/**
 * Router module
 * Provide the router to all endpoints and export it
 * 
 * Routing developped using https://expressjs.com/en/4x/api.html#router
 */

const express = require('express');

const router = express.Router();

// Provide the router to all endpoints
require('./authentication')(router);

module.exports = router;