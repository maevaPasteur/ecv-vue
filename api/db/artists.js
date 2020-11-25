const UsersModel = require('../db/models/Users');

/**
 * Like or not depends of `shouldLike` parameter an artist for a specific user
 * @param {String} id - The artist id.
 * @param {String} userId - User id.
 * @param {Boolean} shouldLike If true must add artist id in user artistLike array either delete artist id.
 */
exports.likeArtistById = async function (id, userId, shouldLike) {
    const user = await UsersModel.findById(userId, 'artistLiked').exec();

    if (shouldLike) {
        if (user.artistLiked.includes(id)) {
            return {
                code: 409
            }
        }

        user.artistLiked.push(id);
        await user.save();

        return {
            code: 200,
            modifyResponse: {
                newArtistLiked: [ ...user.artistLiked]
            }
        }
    }

    if (!user.artistLiked.includes(id)) {
        return {
            code: 409
        }
    }

    user.artistLiked.splice(
        user.artistLiked.findIndex(i => i === id),
        1
    );
    await user.save();

    return {
        code: 200,
        modifyResponse: {
            newArtistLiked: [...user.artistLiked]
        }
    }
}