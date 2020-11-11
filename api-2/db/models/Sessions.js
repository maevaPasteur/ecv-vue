const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Sessions',
  new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
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
