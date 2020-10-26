/* eslint-disable camelcase */
const User = require('../models/data');

const registrationUser = (user) => User.collection.insert(user);

const selectUserByEmail = (email_address1) => User.findOne({ email_address: email_address1 });

const selectUserById = (user_id) => User.findOne({ id: user_id });

module.exports = { registrationUser, selectUserByEmail, selectUserById };
