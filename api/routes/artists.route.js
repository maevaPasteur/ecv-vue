const express = require('express');
const router = express.Router();

const {likeArtistById, getArtists, createArtist, updateArtist, deleteArtist} = require('../controllers/artists.controller');

const isConnected = require('../middlewares/isConnected');
const response = require('../utils/response');


router.get('/', getArtists);

router.post('/', createArtist);

router.patch('/:id', updateArtist);

router.delete('/:id', deleteArtist);

router.patch('/like/:id', isConnected, async (req, res) => {

    const b = Object.keys(req.body);
    if (b.length > 1) return response(res, 422);
    if (!b.includes('shouldLiked')) return response(res, 422);

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


module.exports = router;