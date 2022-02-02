const { User } = require("../models");

const userController = {
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

    addUser({ body }, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(404).json(err));
    }
}

module.exports = userController