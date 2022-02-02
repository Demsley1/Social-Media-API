const { User } = require("../models");

const userController = {
    // Find all users
    getAllUsers(req, res) {
        User.find({})
        .populate([
            'thoughts',
            'friends'
        ])
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err, { message: "Server Error please try again later"})
        })
    },
    // Find a single user by ID
    getOneUser({ params }, res){
        User.findOne({ _id: params.id })
        .populate([
            'thoughts',
            'friends'
        ])
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData){
                return res.status(404).json({ message: 'No User found with this id! '});
            }
            res.json(dbUserData)
        }).catch(err => res.status(404).json(err));  
    },
    // Create a new user
    addUser({ body }, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(404).json(err));
    },
    // Change a users information
    updateUser({ params, body }, res ){
        User.findOneAndUpdate(
            { _id: params.id },
            { $set: body },
            { new: true, runValidators: true }
        ).then(dbUserData => {
            if(!dbUserData){
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
        }).catch(err => res.status(500).json(err));
    },
    // Delete a user
    deleteUser({ params }, res ){
        User.findOneAndDelete(
            { _id: params.id },
            { runValidators: true }
        ).then(dbUserData => {
            if(!dbUserData){
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
        }).catch(err => res.status(500).json(err));
    }
}

module.exports = userController