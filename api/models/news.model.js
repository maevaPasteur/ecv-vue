const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
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
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: [{
            _id: false,
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            },
            content: {
                type: String
            },
            likes: [{
                type: Object,
                params: {
                    userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Users'
                    }
                }
            }]
        }],
    },
}, { timestamps: true })

NewsSchema.pre('find', function () {
    this.populate('comments.userId', "-password -artistLiked -createdAt -updatedAt -__v");
})

NewsSchema.pre('findOneAndUpdate', function () {
    this.populate('comments.userId', "-password -artistLiked -createdAt -updatedAt -__v");
});

module.exports = mongoose.model('News', NewsSchema);
