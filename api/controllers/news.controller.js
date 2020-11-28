const NewsModel = require('../models/news.model');

exports.getNews = async (req, res) => {
    try {
        const news = await NewsModel.find();
        res.json(news);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
};

exports.createNew = async (req, res) => {
    const article = new NewsModel(req.body);
    try {
        const data = await article.save();
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json(err);
    }
};

exports.updateNew = async (req, res) => {
    try {
        const data = await NewsModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
        res.status(201).json(data)
    } catch(err) {
        res.json({ message: err })
    }
};

exports.deletetNew = async (req, res) => {
    try {
        NewsModel.deleteOne({ _id: req.params.id }).then(() => res.json(req.body))
    } catch(err) {
        res.json({ message: err })
    }
};

/**
 * Add a new comment
 * @param {string} - Article id where comment must be add.
 * @param {Object} - Data for the comment.
 */
exports.addNewComment = async function (articleId, commentData) {
    const newArticle = await NewsModel.findByIdAndUpdate(articleId, { $push: { comments: { ...commentData } } }, { new: true });

    return {
        code: 200,
        modifyResponse: newArticle.comments[newArticle.comments.length - 1]
    }
} 