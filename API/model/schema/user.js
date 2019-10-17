const mongoose = require('mongoose');

/**
 * Define user schema
 * 
 * Developped using https://mongoosejs.com/docs/guide.html#definition
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Unique for search and index optimization
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true
  },
  secretKey: String, // The generated secretKey used for signing the session JWT
  username: {
    type: String,
    required: true,
    unique: true
  }
});

/**
 * Create the model from the schema
 * 
 * Developped using https://mongoosejs.com/docs/guide.html#models
 */
module.exports.User = mongoose.model('User', userSchema, 'users');