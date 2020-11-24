const express = require('express');
const router = express.Router();
const News = require('../db/models/News');

router.get('/', async (req,res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

router.post('/', async (req, res) => {
    const article = new News(req.body);
    try {
        const data = await article.save();
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json(err);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const data = await News.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
        res.status(201).json(data)
    } catch(err) {
        res.json({ message: err })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        News.deleteOne({ _id: req.params.id }).then(() => res.json(req.body))
    } catch(err) {
        res.json({ message: err })
    }
});


module.exports = router;