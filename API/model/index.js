/**
 * Compile all schemas into models and provide models
 * 
 * MongoDB management developped using https://mongoosejs.com/docs/index.html
 */

const mongoose = require('mongoose');

module.exports.User = mongoose.model('User', require('./schema/user'));