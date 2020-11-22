const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Artists',
    new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
        origin: {
            type: String,
            required: true
        },
        genreId: {
            type: Number,
            required: true
        },
        like: {
            type: Number,
            default: 0
        },
        description: {
            type: String,
            required: true
        },
    }, {timestamps: true})
);
