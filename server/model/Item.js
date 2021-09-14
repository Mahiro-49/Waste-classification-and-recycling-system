const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Category = require('./Category');

const ItemSchema = new Schema({
  name: { type: String },
  icon: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  danger: { type: Number },
  reuse: { type: Number },
  tips: { type: String },
})

module.exports = model('Item', ItemSchema);