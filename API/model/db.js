/**
 * MongoDB management developped using https://mongoosejs.com/docs/index.html
 */

const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/test_db', { useNewUrlParser: true });
const db = mongoose.connection;

// If database connection fails, kill the server.
db.on('error', (error) => {
  console.log('MongoDB database connection has failed: killing the server.');
  console.log(error);
  process.exit();
});

// When database connection succeed
db.once('open', () => {
  console.log('MongoDB database connected...');
});