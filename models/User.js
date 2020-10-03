const moment = require(`moment`);
const { Schema, model } = require(`mongoose`);

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: `You need to have a username!`,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: `You have to include an email!`,
            unique: true,
            trim: true,
            match: [/.+\@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: `User`
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

UserSchema.virtual(`friendCount`).get(function() {
    return this.friends.reduce((total, friend) => total + friend + 1, 0)
});

const User = model(`User`, UserSchema);

module.exports = User;