const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  secretKey: String // The generated secretKey used for signing the session JWT
});

module.exports =  userSchema;