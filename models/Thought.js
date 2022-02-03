const { Schema, model, Types } = require('mongoose');
// import moment.js library to format date object
const moment = require('moment');

const ReactionSchema = new Schema({
    // specific id for a reaction to users thought
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    // string reaction text with a minimun length of 2 and message if text is submitted under the minlength
    reactionBody: {
        type: String,
        required: true,
        minlength: [2, "Enter a reaction to this thought to continue!"],
        maxlength: 280
    },
    // username of whomever is giving this reaction
    username: {
        type: String,
        required: true
    },
    // created at date value formatted with moment.js
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("ddd, MMM Do YYYY, h:mm a")
    }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const ThoughtSchema = new Schema({
    // a text string for users thoguhts that is required and has a minlength of at least 1 character, and cant be over 280 characters
    thoughtText: {
        type: String,
        required: true,
        minlength: [1, "Please enter a thought to continue!"],
        maxlength: 280
    },
    // createdAt date value formated by moment.js
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("ddd, MMM Do YYYY, h:mm a")
    },
    // string value that is required, and should match one of the already created users, usernames.
    username: {
        type: String,
        required: true
    },
    // array to hold all the reactions for a thoguht
    reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// virtual column to count the number of reactions a thought has and dynamically update if the reactions grow larger.
ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought
