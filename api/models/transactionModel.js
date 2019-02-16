'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TransactionSchema = new Schema({
  resourceName: String,
  eventDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['free', 'occupied'],
    default: 'free'
  },
  user: String,
  comment: String
});

module.exports = mongoose.model('Transactions', TransactionSchema);