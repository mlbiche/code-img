const mongoose = require('mongoose');

/**
 * Define user schema
 * 
 * Developped using https://mongoosejs.com/docs/guide.html#definition
 */
const userSchema = new mongoose.Schema({
  email: { //these fileds should be given to create user
    type: String,
    required: true,
    unique: true,//unique for search and index optimization
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  }, // for validation add built in validation with monsgoose
  password: { type: String, required: true },// this filed should be given to create user
  secretKey: String, // The generated secretKey used for signing the session JWT
  username: { type: String, required: true, unique: true }
});

/**
 * Create the model from the schema
 * 
 * Developped using https://mongoosejs.com/docs/guide.html#models
 */
module.exports.User = mongoose.model('User', userSchema, 'users');