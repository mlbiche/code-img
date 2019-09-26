const mongoose = require('mongoose');

/**
 * Define response schema
 * 
 * Developped using https://mongoosejs.com/docs/guide.html#definition
 */
const responseSchema = new mongoose.Schema({
  user: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  imageUrl: {
    type: String,
    required: true
  }
});

/**
 * This schema doe not correspond to a collection so we export its schema to be used
 * in another schema.
 */
module.exports.ResponseSchema = responseSchema;