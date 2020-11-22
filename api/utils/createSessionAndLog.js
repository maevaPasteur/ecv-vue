const { promisify } = require("util");
const { randomFill } = require("crypto");
const { hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { serialize } = require("cookie");

const sessionsCol = require("../db/models/Sessions");

const createKey = promisify(randomFill);
const jwtPromisify = promisify(sign);

/**
 * Create an session user and return data.
 * @param {Object} userData - The user data to insert in session collection.
 * @param {Boolean} sessionUpdate - If this options is true we have to update a session and not creating one.
 * @param {Boolean} updateToken - If true the server should update and return a nex JWT.
 */
module.exports = async function (userData, sessionUpdate = false, updateToken = true) {
    const sessionKey = await createKey(Buffer.alloc(16));
    const sessionExpireAt = new Date(Date.now() + 60 + 60 * 10000);
    let newSession;

    if (sessionUpdate) {
        const propsToUpdate = {
            expireAt: sessionExpireAt
        };

        if (updateToken) {
            propsToUpdate.key = sessionKey.toString("hex");
        };

        newSession = await sessionsCol.findByIdAndUpdate(userData._id, { ...propsToUpdate }, {new: true}).exec();
    } else {
        newSession = await new sessionsCol({
            userId: userData._id,
            key: sessionKey.toString('hex'),
            expireAt: sessionExpireAt
        }).save();
    }

    if (updateToken) {
        const tokenRefresh = await hash(sessionKey.toString("hex"), 10);
        const cookieOps = {
            httpOnly: true,
            maxAge: 3600,
            path: "/",
            sameSite: true
        };
        const newToken = await jwtPromisify(
            {
                iss: newSession._id
            },
            sessionKey.toString("hex"),
            {
                expiresIn: "1m",
                noTimestamp: true
            }
        );

        return {
            header: {
                "Set-Cookie": serialize("token", tokenRefresh, cookieOps)
            },
            forClient: {
                token: newToken,
            },
            newSession: newSession
        };
    }

    return {
        newSession: newSession
    };
}