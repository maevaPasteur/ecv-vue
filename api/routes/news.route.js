const express = require('express');
const router = express.Router();

const {
    getNews, 
    createNew, 
    updateNew, 
    deletetNew, 
    addNewComment
} = require('../controllers/news.controller');
const isConnected = require('../middlewares/isConnected');
const response = require('../utils/response');

router.get('/', getNews);

router.post('/', createNew);

router.patch('/:id', updateNew);

router.delete('/:id', deletetNew);

router.patch('/comment/:id', isConnected, async function (req, res) {
    const b = Object.keys(req.body);

    if (b.length > 2) {
        return response(res, 422);
    }

    if (
        !b.includes('userId') ||
        !b.includes('content')
    ) {
        return response(res, 422);
    }

    const responseController = await addNewComment(req.params.id, req.body);

    return response(res, responseController.code, {
        serverHeader: res.locals.data.header || responseController.serverHeader ? {
            ...res.locals.data.header,
            ...responseController.serverHeader
        } : undefined,
        modifyResponse: responseController.modifyResponse ? responseController.modifyResponse._doc : undefined,
        token: res.locals.data.forClient ? res.locals.data.forClient.token : undefined
    });
});

module.exports = router;