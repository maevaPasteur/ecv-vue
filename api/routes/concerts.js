const express = require('express');
const router = express.Router();
const Concerts = require('../db/models/Concerts');

router.get('/', async (req,res) => {
    try {
        const concerts = await Concerts.find();
        res.json(concerts);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

router.post('/', async (req, res) => {
    const concert = new Concerts(req.body);
    try {
        const data = await concert.save();
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json(err);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const data = await Concerts.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(201).json(data)
    } catch(err) {
        res.json({ message: err })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        Concerts.deleteOne({ _id: req.params.id }).then(() => res.json(req.body))
    } catch(err) {
        res.json({ message: err })
    }
});

module.exports = router;