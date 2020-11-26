const NewsRoute = require('../models/news.model');

exports.getNews = async (req, res) => {
    try {
        const news = await NewsRoute.find();
        res.json(news);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
};

exports.createNew = async (req, res) => {
    const article = new NewsRoute(req.body);
    try {
        const data = await article.save();
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json(err);
    }
};

exports.updateNew = async (req, res) => {
    try {
        const data = await NewsRoute.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
        res.status(201).json(data)
    } catch(err) {
        res.json({ message: err })
    }
};

exports.deletetNew = async (req, res) => {
    try {
        NewsRoute.deleteOne({ _id: req.params.id }).then(() => res.json(req.body))
    } catch(err) {
        res.json({ message: err })
    }
};