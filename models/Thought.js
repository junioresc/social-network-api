const moment = require(`moment`);
const { Schema, model, Types } = require(`mongoose`);

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: `You must include something in the comment!`,
            maxlength: 280
        },
        username: {
            type: String,
            required: `You need to include a username with this reaction!`
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format(`MMM DD, YYYY [at] hh:mm a`)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const ThoughtSchema =  new Schema(
    {
        thoughtText: {
            type: String,
            required: `You need to include something in the thought!`,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format(`MMM DD, YYYY [at] hh:mm a`)
        },
        username: {
            type: String,
            required: `You need to include a username with this thought`
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

ThoughtSchema.virtual(`reactionCount`).get(function() {
    return this.reactions.length;
});

const Thought = model(`Thought`, ThoughtSchema);

module.exports = Thought;