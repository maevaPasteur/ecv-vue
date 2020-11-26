const { decode, verify } = require("jsonwebtoken");
const { compare } = require("bcrypt");

const response = require("../utils/response");
const createSessionAndLog = require("../utils/createSessionAndLog");
const sessionsCol = require("../models/sessions.model");

module.exports = async function (req, res, next) {
    if (!req.headers.authorization) return response(res, 400);

    const [b, token] = req.headers.authorization.split(" ");
    if (b !== "Bearer" || !token || token.split(".").length !== 3) return response(res, 400);

    const tokenValue = decode(token);

    if (tokenValue) {
        const tokenAsArray = Object.keys(tokenValue);

        if (tokenAsArray.length !== 2) return response(res, 401);
        if (tokenAsArray[0] !== "iss" || tokenAsArray[1] !== "exp") return response(res, 401);

        const userSession = await sessionsCol.findById(tokenValue.iss, 'key').exec();

        if (!userSession) {
            return response(res, 401);
        }

        return verify(token, userSession.key, async function (err) {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    try {
                        if (await compare(userSession.key, req.cookies.token)) {
                            res.locals.data = await createSessionAndLog(userSession, true);
                            return next();
                        }
                    } catch (error) {
                        throw error;
                    }

                    return response(req, 401);
                }

                return response(res, 401);
            }

            res.locals.data = await createSessionAndLog(userSession, true, false);
            return next();
        });
    }

    return response(res, 401);
}