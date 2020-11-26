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
        tracks: {
            type: Number,
            required: true
        },
        cover: {
            type: String,
            required: true
        },
        artistId: {
            type: String,
            required: true
        },
    }, {timestamps: true})
);
