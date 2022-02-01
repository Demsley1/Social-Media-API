const { User } = require("../models");

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err, { message: "Server Error please try again later"})
        })
    },

    getOneUser(req, res){
        User.findOne()
    }
}

module.exports = userController