const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: String,
  last_name: String,
  email_address: String,
  mobile: Number,
  company: String,
  password: String,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
