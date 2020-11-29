const express = require('express');
const router = express.Router();

const UserModel = require('../models/user.model');

const isConnected = require('../middlewares/isConnected');
const response = require('../utils/response');

router.head('/', isConnected, function (req, res) {
    return response(res, 200);
});

router.get('/', isConnected, async (req, res) => {
    const user = await UserModel.findById(res.locals.data.newSession.userId);
    return response(res, 200, {
        serverHeader: res.locals.data.header ? {...res.locals.data.header} : undefined,
        modifyResponse: user._doc,
        token: res.locals.data.forClient ? res.locals.data.forClient.token : undefined
    })
});



module.exports = router;