const express = require('express');
const router = express.Router();

const {getAlbums, createAlbum, updateAlbum, deleteAlbum} = require('../controllers/album.controller');


router.get('/', getAlbums);

router.post('/', createAlbum);

router.patch('/:id', updateAlbum);

router.delete('/:id', deleteAlbum);


module.exports = router;