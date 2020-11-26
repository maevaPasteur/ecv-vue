const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Sessions',
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    key: {
      required: true,
      type: String,
    },
    expireAt: {
      required: true,
      expires: 0,
      type: Date,
    },
  }, {timestamps: true})
);
