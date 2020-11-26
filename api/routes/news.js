const express = require('express');
const router = express.Router();
const News = require('../db/models/News');

const {addNewComment} = require('../db/news');
const isConnected = require('../middlewares/isConnected');
const response = require('../utils/response');

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

router.patch('/comment/:id', isConnected, async function (req, res) {
    const b = Object.keys(req.body);

    if (b.length > 2)  {
        return response(res, 422);
    }

    if (
        !b.includes('userId') ||
        !b.includes('content')
    ) {
        return response(res, 422);
    }

    const responseController = await addNewComment(req.params.id, req.body);

    return response(res, responseController.code, {
        serverHeader: res.locals.data.header || responseController.serverHeader ? {
            ...res.locals.data.header,
            ...responseController.serverHeader
        } : undefined,
        modifyResponse: responseController.modifyResponse ? responseController.modifyResponse._doc : undefined,
        token: res.locals.data.forClient ? res.locals.data.forClient.token : undefined
    });
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