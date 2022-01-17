const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const OriderSchema = new Schema({
  time: { type: String },
  location: { type: String },
  person: { type: String },
  phone: { type: String },
})

module.exports = model('OriderSchema', OriderSchema);