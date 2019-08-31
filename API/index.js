const express = require('express');

const PORT = 3000;

const app = express();

app.get('/login', (req, res) => {
 req.params.username
 req.params.password

});


app.listen(PORT, () => {
  console.log('Server listening on port ${PORT}...')
});