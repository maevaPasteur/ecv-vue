require("dotenv").config();
const mongoose = require("mongoose");

const UsersModel = require('../api/db/models/Users');

async function populateAvatar () {
    const users = await UsersModel.find({}, 'avatar');

    await Promise.all(users.map(async function (u) {
        if (u.avatar.startsWith('http')) return;

        await UsersModel.findByIdAndUpdate(u.id, { avatar: 'https://s3.amazonaws.com/realtalktime.com/wp-content/uploads/2020/10/03195814/apple-masked-emoji-1.jpg'});
    }))
}

(async function main() {
    const actionName = process.argv[process.argv.length - 1].split('=')[1];

    if (!actionName) {
        process.stderr.write('You must add the --action flag');
        return process.exit(0);
    }

    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            bufferCommands: false,
            useFindAndModify: false
        });

        switch (actionName) {
            case 'avatar':
                await populateAvatar();
                process.exit(0);
            default:
                break;
        }

        await mongoose.connection.close();
    } catch (error) {
        throw error
    }
})();