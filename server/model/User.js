const mongoose = require('mongoose');
const { Schema, model } = mongoose
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  username: { type: String, require: true },
  password: {
    type: String, 
    require: true,
    set(val) {
      return bcrypt.hashSync(val, 10)
    }
  },
  email: { type: String, require: true },
  img: { type: String },
  isAdmin: { type: String, default: '用户'}
})

const User = model('User', UserSchema)

module.exports = User