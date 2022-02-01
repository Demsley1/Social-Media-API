const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: "You need to enter a username!",
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [ /^([\w\.-]+)@([a-zA-Z\.-]{3,8})\.([\w\.]{2,6})/, "Please provide a valid e-mail address." ]
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

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

const User = model("User", UserSchema );

module.exports = User;