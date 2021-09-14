const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CategorySchema = new Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }, // ref指的是关联的模型
})

module.exports = model('Category', CategorySchema);