const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Genres',
    new mongoose.Schema({
        name: {
            required: true,
            type: String
        },
    }, {timestamps: true})
);
