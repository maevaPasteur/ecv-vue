const express = require('express');
const router = express.Router();

const response = require('../utils/response');
const loginController = require('../db/login');

router.post('/', async function (req, res) {
  const bodyArray = Object.keys(req.body);

  if (bodyArray.length >= 3) {
    return response(res, 400);
  }

  if (!bodyArray.includes('email') || !bodyArray.includes('password')) {
    return response(res, 422);
  }

  if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      req.body.email
    ) === false
  ) {
    return response(res, 400);
  }

  if (req.body.password.length < 5) {
    return response(res, 400);
  }

  return loginController(req.body).then(function (userData) {
    return response(res, userData.code, {
      serverHeader: userData.header ? { ...userData.header } : {},
      content: userData.content ? userData.content : undefined,
      modifyResponse: userData.forClient ? { ...userData.forClient } : undefined,
    });
  });
});

module.exports = router;
