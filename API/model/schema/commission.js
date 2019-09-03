const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
  commission: Number
});

module.exports =  commissionSchema;