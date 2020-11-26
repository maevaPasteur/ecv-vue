const AlbumsModel = require('../models/albums.model');

exports.getAlbums = async (req, res) => {
    try {
        const albums = await AlbumsModel.find();
        res.json(albums);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
};

exports.createAlbum = async (req, res) => {
    const album = new AlbumsModel(req.body);
    try {
        const data = await album.save();
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json(err);
    }
};

exports.updateAlbum = async (req, res) => {
    try {
        const data = await AlbumsModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
        res.status(201).json(data)
    } catch(err) {
        res.json({ message: err })
    }
};

exports.deleteAlbum = async (req, res) => {
    try {
        AlbumsModel.deleteOne({ _id: req.params.id }).then(() => res.json(req.body))
    } catch(err) {
        res.json({ message: err })
    }
};