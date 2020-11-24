const { compare } = require('bcrypt');
const usersCol = require('./models/Users');
const createSessionAndLog = require("../utils/createSessionAndLog");

/**
 * Check if an user exist.
 * @param {Object} data - The data send in the body by the client.
 */
module.exports = async function Login(data) {
  const user = await usersCol.findOne({ email: data.email }, 'username avatar email password').exec();

  if (!user) {
    return {
      code: 403,
    };
  }

  if (await compare(data.password, user.password)) {
    const d = await createSessionAndLog(user);

    console.log(user);
    delete user.password;
    d.forClient.userData = user;

    return {
      code: 200,
      header: d.header,
      forClient: d.forClient
    };
  }

  return {
    code: 401,
    content: 'Email and password combination incorrect.'
  }
};
