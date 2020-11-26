const UsersModel = require('../models/user.model');

const response = require('../utils/response');

/**
 * Check if user is an admin
 */
module.exports = async function (req, res, next) {
    const { role } = await UsersModel.findById(res.locals.data.newSession.userId, 'role').exec();
    console.log(role);

    if (role) {
        return next();
    } else {
        response(res, 401, {
            serverHeader: res.locals.data.header  ? { ...res.locals.data.header } : undefined,
            token: res.locals.data.forClient ? res.locals.data.forClient.token : undefined
        });
    }
}