const express = require("express");
const router = express.Router();

const sessionsCol = require('../models/sessions.model');
const isConnected = require("../middlewares/isConnected");
const response = require("../utils/response");

router.delete('/', isConnected, async function (req, res) {
    if (await sessionsCol.findByIdAndDelete(res.locals.data.newSession._id)) {
        return response(res, 204)
    }
    return response(res, 500);
});

module.exports = router;