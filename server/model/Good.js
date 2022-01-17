const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const GoodsSchema = new Schema({
  name: { type: String },
  price: { type: String },
  location: {type: String },
  iphone: { type: String },
  time: { type: String },
  icon: { type: String },
  // parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
})

module.exports = model('Goods', GoodsSchema);