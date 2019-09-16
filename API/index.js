const express = require('express');
const db = require('./model/db'); // Load the MongoDB database
const { body } = require('express-validator');
const cors = require('cors');
const loginEndpointCallback = require('./routes/login');
const registrationEndpointCallback = require('./routes/registration');
const deleteEndpointCallback = require('./routes/deleteUser');

const PORT = 3000;

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
  origin: 'http://localhost:3001',
  credentials:  true
}

app.use(cors(corsOptions))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// POST /login endpoint
app.post('/login',
  // Validate request body
  [
    body('email').isEmail(),
    body('password').not().isEmpty()
  ],
  loginEndpointCallback
);

// POST/registeration endpoint
app.post('/registeration',
  // Validate request body
  [
    body('username').not().isEmpty(),
    body('email').isEmail(),
    body('password').not().isEmpty()
  ],
  registrationEndpointCallback
);

// DELETE/:userId endpoint
app.delete('/:userId',
  deleteEndpointCallback
);

// Launch the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});