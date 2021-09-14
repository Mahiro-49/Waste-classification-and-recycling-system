const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ReuseSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  location: {type: String },
})

module.exports = model('Reuse', ReuseSchema);