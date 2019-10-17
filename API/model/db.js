/**
 * MongoDB management developped using https://mongoosejs.com/docs/index.html
 */

const mongoose = require('mongoose');

// The MongoDB database URL
const DB_URL = 'mongodb://localhost/test_db';

// Connect to MongoDB database
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
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