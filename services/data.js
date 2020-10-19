/* eslint-disable camelcase */
const User = require('../models/data');

const registrationUser = (user) => {
  User.collection.insert(user);
};

const selectUserByEmail = (email_address1) => User.findOne({ email_address: email_address1 });

module.exports = { registrationUser, selectUserByEmail };
