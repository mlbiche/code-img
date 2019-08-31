const express = require('express');

const PORT = 3000;

const app = express();

app.get('/login', (req, res) => {

});


app.listen(PORT, () => {
  console.log('Server listening on port ${PORT}...')
});