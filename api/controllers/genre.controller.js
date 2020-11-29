const GenresRoute = require('../models/genres.model');

exports.getGenres = async (req, res) => {
    try {
        const genres = await GenresRoute.find();
        res.json(genres);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
};

exports.createGenre = async (req, res) => {
    const genre = new GenresRoute(req.body);
    try {
        const data = await genre.save();
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json(err);
    }
};

exports.updateGenre = async (req, res) => {
    try {
        const data = await GenresRoute.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.status(201).json(data)
    } catch(err) {
        res.json({ message: err })
    }
};

exports.deleteGenre = async (req, res) => {
    try {
        GenresRoute.deleteOne({ _id: req.params.id }).then(() => res.status(200).json({message: "Supprimé"}));
    } catch(err) {
        res.json({ message: err })
    }
};