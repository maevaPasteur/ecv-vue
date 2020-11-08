const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Users',
  new mongoose.Schema({
    username: {
      required: true,
      type: String,
      lowercase: true,
    },
    email: {
      required: true,
      type: String,
      unique: true,
      match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    password: {
      required: true,
      type: String,
    },
    avatar: {
      type: String,
    },
    role: {
      required: true,
      type: Boolean,
    },
  })
);
