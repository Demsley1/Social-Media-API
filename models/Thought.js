const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: [2, "Enter a reaction to this thought to continue!"],
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: [1, "Please enter a thought to continue!"],
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought
