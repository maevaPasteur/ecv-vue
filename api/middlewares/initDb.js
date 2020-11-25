const mongoose = require('mongoose');
const response = require('../utils/response');

module.exports = function (ops) {
  return async function (req, res, next) {
    if (mongoose.connection.readyState === 1) return next();

    try {
      mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
      next();
    } catch (error) {
      console.log(error);
      return response(res, 500);
    }
  };
};
