const NewsModel = require('./models/News');

/**
 * Add a new comment
 * @param {string} - Article id where comment must be add.
 * @param {Object} - Data for the comment.
 */
exports.addNewComment = async function (articleId, commentData) {
    const newArticle = await NewsModel.findByIdAndUpdate(articleId, {$push: {comments: { ...commentData }}}, {new: true});

    return {
        code: 200,
        modifyResponse: newArticle.comments[newArticle.comments.length - 1]
    }
}