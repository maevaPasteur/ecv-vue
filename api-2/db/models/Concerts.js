const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Concerts',
    new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        artistId: {
            type: String,
            required: true
        },
    }, {timestamps: true})
);
