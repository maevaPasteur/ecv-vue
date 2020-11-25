const express = require('express');
const router = express.Router();

const {likeArtistById} = require('../db/artists');
const isConnected = require('../middlewares/isConnected');
const response = require('../utils/response');
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
        const data = await Artists.updateOne({_id: req.params.id}, {$set: req.body});
        res.status(201).json(data)
    } catch (err) {
        res.json({message: err})
    }
});

router.patch('/like/:id', isConnected, async (req, res) => {
    const b = Object.keys(req.body);

    if (b.length > 1) {
        return response(res, 422);
    }

    if (!b.includes('shouldLiked')) {
        return response(res, 422);
    }

    const responseController = await likeArtistById(req.params.id, res.locals.data.newSession.userId, req.body.shouldLiked);

    return response(res, responseController.code, {
        serverHeader: res.locals.data.header || responseController.serverHeader ? { 
            ...res.locals.data.header,
            ...responseController.serverHeader
        } : undefined,
        modifyResponse: responseController.modifyResponse ? { ...responseController.modifyResponse} : undefined,
        token: res.locals.data.forClient ? res.locals.data.forClient.token : undefined
    })
});

router.delete('/:id', async (req, res) => {
    try {
        Artists.deleteOne({_id: req.params.id}).then(() => res.json(req.body))
    } catch (err) {
        res.json({message: err})
    }
});


module.exports = router;