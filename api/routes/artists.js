const express = require('express');
const router = express.Router();
const Artists = require('../db/models/Artists');

router.get('/', async (req, res) => {
    try {
        const artists = await Artists.find();
        res.json(artists);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.post('/', async (req, res) => {
    const artist = new Artists(req.body);
    try {
        const data = await artist.save();
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        await Artists.updateOne({_id: req.params.id}, {$set: req.body}).then(() => res.json(req.body))
    } catch (err) {
        res.json({message: err})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Artists.deleteOne({_id: req.params.id}).then(() => res.json(req.body))
    } catch (err) {
        res.json({message: err})
    }
});


module.exports = router;