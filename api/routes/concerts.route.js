const express = require('express');
const router = express.Router();

const {getConcerts, createConcert, updateConcert, deleteConcert} = require('../controllers/concerts.controller');


router.get('/', getConcerts);

router.post('/', createConcert);

router.patch('/:id', updateConcert);

router.delete('/:id', deleteConcert);


module.exports = router;