const { Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res){
        Thought.find({})
        
    }
}

module.exports = thoughtController;