'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ResourceSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the resource',
    unique: true
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['free', 'occupied'],
    default: 'free'
  },
  createdBy: String,
  user: String,
  checkOutDate: Date,
  checkOutComment: String
});

module.exports = mongoose.model('Resources', ResourceSchema);