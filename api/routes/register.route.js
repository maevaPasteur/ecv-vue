const express = require('express');
const router = express.Router();
const response = require('../utils/response');
const registerController = require('../controllers/register.controller');

router.post('/', async function (req, res) {

  const bodyArray = Object.keys(req.body);

  if (bodyArray.length >= 5) {
    return response(res, 400);
  }

  if (
    !bodyArray.includes('username') ||
    !bodyArray.includes('email') ||
    !bodyArray.includes('password') ||
    !bodyArray.includes('avatar')
  ) {
    return response(res, 422);
  }

  return registerController(req.body).then(function (userData) {
    return response(res, userData.code, {
      serverHeader: userData.header ? { ...userData.header } : {},
      content: userData.content ? userData.content : undefined,
      modifyResponse: userData.forClient ? { ...userData.forClient } : undefined,
    });
  });
});

module.exports = router;
