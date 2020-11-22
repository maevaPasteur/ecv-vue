const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Albums',
    new mongoose.Schema({
        name: {
            required: true,
            type: String
        },
        released: {
            required: true,
            type: Number
        },
        track: {
            type: Number,
            required: true
        },
        cover: {
            type: String,
            required: true
        },
        artistId: {
            type: Number,
            required: true
        },
    }, {timestamps: true})
);
