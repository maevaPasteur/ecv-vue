const express = require('express');
const router = express.Router();

const {getGenres, createGenre, updateGenre, deleteGenre} = require('../controllers/genre.controller');


router.get('/', getGenres);

router.post('/', createGenre);

router.patch('/:id', updateGenre);

router.delete('/:id', deleteGenre);


module.exports = router;