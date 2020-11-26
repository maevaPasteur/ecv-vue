const express = require('express');
const router = express.Router();

const {getNews, createNew, updateNew, deletetNew} = require('../controllers/news.controller');


router.get('/', getNews);

router.post('/', createNew);

router.patch('/:id', updateNew);

router.delete('/:id', deletetNew);


module.exports = router;