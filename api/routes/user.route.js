const express = require('express');
const router = express.Router();

const isConnected = require('../middlewares/isConnected');
const response = require('../utils/response');

router.head('/', isConnected, function (req, res) {
    return response(res, 200);
});

module.exports = router;