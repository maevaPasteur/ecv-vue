const { hash } = require('bcrypt');
const usersCol = require('./models/Users');
const createSessionAndLog = require('../utils/createSessionAndLog');

/**
 * Create a new user if not already register.
 * @param {Object} data - The date send by the request body
 */
module.exports = async function Register(data) {
  if (!(await usersCol.exists({ email: data.email }))) {
    const passwordHashed = await hash(data.password, 10);
    const forClient = {};

    const newUser = await new usersCol({
      ...data,
      password: passwordHashed,
    }).save();

    const d = await createSessionAndLog(newUser);
    
    Object.keys(newUser._doc).forEach(function (el) {
      if (['password', 'createdAt', 'updatedAt', '__v'].includes(el)) return;

      forClient[el] = newUser[el];
    });

    return {
      code: 200,
      header: d.header,
      forClient: Object.assign(d.forClient, forClient)
    };
  }

  return {
    code: 409,
  };
};
