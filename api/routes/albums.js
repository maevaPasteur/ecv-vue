const express = require('express');
const router = express.Router();
const Albums = require('../db/models/Albums');

router.get('/', async (req, res) => {
    try {
        const albums = await Albums.find();
        res.json(albums);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

router.post('/', async (req, res) => {
    const album = new Albums(req.body);
    try {
        const data = await album.save();
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json(err);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const data = await Albums.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
        res.status(201).json(data)
    } catch(err) {
        res.json({ message: err })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        Albums.deleteOne({ _id: req.params.id }).then(() => res.json(req.body))
    } catch(err) {
        res.json({ message: err })
    }
});


module.exports = router;