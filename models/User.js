const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    // username, string that is required and give message upon failure
    username: {
        type: String,
        unique: true,
        required: "You need to enter a username!",
        trim: true
    },
    // A unique string that is required and matched with a regular expression and message to validate
    email: {
        type: String,
        unique: true,
        required: true,
        match: [ /^([\w\.-]+)@([a-zA-Z\.-]{3,8})\.([\w\.]{2,6})/, "Please provide a valid e-mail address." ]
    },
    // array to hold a users thoughtId's
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    // array to hold a users friend, userId
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
);

// a virtual column that counts how many friends a user has and updates when more are added to the array
UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

const User = model("User", UserSchema );

module.exports = User;