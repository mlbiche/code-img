const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const PORT = 3000;

const app = express();

// Specify that body should be encrypted in JSON
app.use(bodyParser.json());

// Use the router to provide all endpoints to the Express app
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});