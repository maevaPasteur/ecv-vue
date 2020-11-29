const UsersModel = require('../models/user.model');
const ArtistsModel = require('../models/artists.model');
const artistsModel = require('../models/artists.model');

exports.getArtists = async (req, res) => {
    try {
        const artists = await ArtistsModel.find();
        res.json(artists);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

exports.createArtist = async (req, res) => {
    const artist = new ArtistsModel(req.body);
    try {
        const data = await artist.save();
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.updateArtist = async (req, res) => {
    try {
        const data = await ArtistsModel.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, { new: true });
        res.status(201).json(data)
    } catch (err) {
        res.json({message: err})
    }
};

exports.deleteArtist = async (req, res) => {
    try {
        ArtistsModel.deleteOne({_id: req.params.id}).then(() => res.status(200).json({message: "Supprimé"}))
    } catch (err) {
        res.json({message: err})
    }
};

/**
 * Like or not depends of `shouldLike` parameter an artist for a specific user
 * @param {String} id - The artist id.
 * @param {String} userId - User id.
 * @param {Boolean} shouldLike If true must add artist id in user artistLike array either delete artist id.
 */
exports.likeArtistById = async function (id, userId, shouldLike) {
    const user = await UsersModel.findById(userId, 'artistLiked').exec();
    const artist = await artistsModel.findById(id);

    if (shouldLike) {
        if (user.artistLiked.includes(id)) {
            return {
                code: 409
            }
        }

        user.artistLiked.push(id);
        artist.likes = artist.likes + 1;

        await artist.save();
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
    artist.likes = artist.likes - 1;

    await artist.save();
    await user.save();

    return {
        code: 200,
        modifyResponse: {
            newArtistLiked: [...user.artistLiked]
        }
    }
};