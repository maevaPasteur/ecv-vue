const express = require('express');
const router = express.Router();
const Genres = require('../db/models/Genres');

router.get('/', async (req,res) => {
    try {
        const genres = await Genres.find();
        res.json(genres);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

router.post('/', async (req, res) => {
    const genre = new Genres(req.body);
    try {
        const data = await genre.save();
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json(err);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        await Genres.updateOne({ _id: req.params.id }, { $set: req.body }).then(() => res.json(req.body))
    } catch(err) {
        res.json({ message: err })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Genres.deleteOne({ _id: req.params.id }).then(() => res.json(req.body))
    } catch(err) {
        res.json({ message: err })
    }
});


module.exports = router;