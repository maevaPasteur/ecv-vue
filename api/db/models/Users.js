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
      default: 'https://s3.amazonaws.com/realtalktime.com/wp-content/uploads/2020/10/03195814/apple-masked-emoji-1.jpg'
    },
    role: {
      type: Boolean,
    },
    artistLiked: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artists'
      }]
    }
  }, {timestamps: true})
);
