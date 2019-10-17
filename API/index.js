/**
 * index.js
 * 
 * Start the API server and define the RESTful API routes
 */

const express = require('express');
require('./model/db'); // Load the MongoDB database
const { body, query, param } = require('express-validator');
const cors = require('cors');
const loginEndpointCallback = require('./routes/login');
const registrationEndpointCallback = require('./routes/registration');
const deleteEndpointCallback = require('./routes/deleteUser');
const discussionsEndpointCallback = require('./routes/discussions');
const discussionResponsesEndpointCallback = require('./routes/discussionResponses');

const PORT = 8080;

// The Web Application URL
const FRONT_END_URL = 'http://localhost:3000';

const app = express();

// Specify that body should be encrypted in JSON
app.use(express.json());

/**
 * Accept CORS for local test
 * 
 * Developped using https://stackoverflow.com/questions/42710057/fetch-cannot-set-cookies-received-from-the-server
 * Developped using https://enable-cors.org/server_expressjs.html
 */
var corsOptions = {
  origin: FRONT_END_URL,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  credentials: true
};

app.use(cors(corsOptions));

// POST /login endpoint
app.post('/login',
  // Validate request body
  [
    body('email').isEmail(),
    body('password').not().isEmpty()
  ],
  loginEndpointCallback
);

// POST /registration endpoint
app.post('/registration',
  // Validate request body
  [
    body('username').not().isEmpty(),
    body('email').isEmail(),
    body('password').not().isEmpty()
  ],
  registrationEndpointCallback
);

// DELETE /:userId endpoint
app.delete('/:userId',
  deleteEndpointCallback
);

// GET /discussions endpoint
app.get('/discussions',
  // Validate request query
  [
    query('pageNum').isInt({ min: 1 }),
    query('pageSize').isInt({ min: 1 })
  ],
  discussionsEndpointCallback
);

// GET /discussion/:discussionId endpoint
app.get('/discussion/:discussionId',
  // Validate request param
  [
    param('discussionId').isLength({ min: 24, max: 24 })
  ],
  discussionResponsesEndpointCallback
);

// Launch the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});