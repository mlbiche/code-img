const mongoose = require('mongoose');

/**
 * Define user schema
 * 
 * Developped using https://mongoosejs.com/docs/guide.html#definition
 */
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  secretKey: String // The generated secretKey used for signing the session JWT
});

/**
 * Create the model from the schema
 * 
 * Developped using https://mongoosejs.com/docs/guide.html#models
 */
module.exports.User = mongoose.model('User', userSchema);