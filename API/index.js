const express = require('express');
const db = require('./model/db'); // Load the MongoDB database
const { body } = require('express-validator');
const loginEndpointCallback = require('./routes/login');

const PORT = 3000;

const app = express();

// Specify that body should be encrypted in JSON
app.use(express.json());

// POST /login endpoint
app.post('/login',
  // Validate request body
  [
    body('email').isEmail(),
    body('password').not().isEmpty()
  ],
  loginEndpointCallback
);

// Launch the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});