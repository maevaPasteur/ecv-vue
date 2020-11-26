const ConcertsRoute = require('../models/concerts.model');

exports.getConcerts = async (req, res) => {
    try {
        const concerts = await ConcertsRoute.find();
        res.json(concerts);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
};

exports.createConcert = async (req, res) => {
    const concert = new ConcertsRoute(req.body);
    try {
        const data = await concert.save();
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json(err);
    }
};

exports.updateConcert = async (req, res) => {
    try {
        const data = await ConcertsRoute.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(201).json(data)
    } catch(err) {
        res.json({ message: err })
    }
};

exports.deleteConcert = async (req, res) => {
    try {
        ConcertsRoute.deleteOne({ _id: req.params.id }).then(() => res.json(req.body))
    } catch(err) {
        res.json({ message: err })
    }
};