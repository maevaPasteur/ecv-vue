const { hash } = require('bcrypt');
const usersCol = require('./models/Users');

/**
 * Create a new user if not already register.
 * @param {Object} data - The date send by the request body
 */
module.exports = async function Register(data) {
  if (!(await usersCol.exists({ email: data.email }))) {
    const passwordHashed = await hash(data.password, 10);

    await new usersCol({
      ...data,
      password: passwordHashed,
    }).save();

    return {
      code: 200,
    };
  }

  return {
    code: 409,
  };
};
