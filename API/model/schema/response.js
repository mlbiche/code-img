const mongoose = require('mongoose');

/**
 * Define response schema
 * 
 * Developped using https://mongoosejs.com/docs/guide.html#definition
 */
const responseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  imgUrl: {
    type: String,
    required: true
  }
});

/**
 * This schema does not correspond to a collection so we export its schema to be used
 * in another schema.
 */
module.exports.ResponseSchema = responseSchema;