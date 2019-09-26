const mongoose = require('mongoose');
const { ResponseSchema } = require('./response');

/**
 * Define discussion schema
 * 
 * Developped using https://mongoosejs.com/docs/guide.html#definition
 */
const discussionSchema = new mongoose.Schema({
  responses: {
    type: [
      ResponseSchema
    ],
    required: true
  }
});

/**
 * Create the model from the schema
 * 
 * Developped using https://mongoosejs.com/docs/guide.html#models
 */
module.exports.Discussion = mongoose.model('Discussion', discussionSchema, 'discussions');