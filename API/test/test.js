const mongoose = require('mongoose');

// Connect to the MongoDB database before testing
before(async () => {
  try {
    await mongoose.connect('mongodb://localhost/test_db', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

    console.log('Connected to MongoDB database!');
  } catch (err) {
    console.log('MongoDB database connection has failed. Please check that the database is started. Killing the test.');
    console.log(err);
    process.exit();
  }
});

// Disconnect from the the MongoDB database after testing
after(async () => {
  try {
    await mongoose.disconnect();

    console.log('Disconnected from MongoDB database!');
  } catch(err) {
    console.log('MongoDB database disconnection has failed.');
    console.log(err);
  }
});

// Test API endpoints
require('./endpoints');