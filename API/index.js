const express = require('express');
const router = require('./routes');

const PORT = 3000;

const app = express();

// Use the router to provide all endpoints to the Express app
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});