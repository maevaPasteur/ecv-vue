const mongoose = require('mongoose');

module.exports = mongoose.model(
    'News',
    new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        published: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        artistesId: {
            type: Array,
            required: true
        },
        like: {
            type: Number,
            default: 0
        },
        comments: {
            type: Array,
            default: []
        },
    }, {timestamps: true})
);
