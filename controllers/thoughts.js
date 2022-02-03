const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res){
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '_id'
        })
        .select("-__v")
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(500).json(err));   
    },

    // get a single thought by Id, retrieve all reaction data
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData){
                return res.status(404).json({ message: "No thoughts found for requested id! "})
            }
            res.json(dbThoughtData)
        }).catch(err => res.status(500).json(err));
    },

    // Create a users thought and add it to a users thought array by searching the username
    createThought({ body }, res){
        Thought.create(body)
        .then(({ _id, username }) => {
            return User.findOneAndUpdate(
                { username: username },
                { $push: { thoughts: _id }},
                { new: true }
            );
        }).then(dbThoughtData => {
            if(!dbThoughtData){
                return res.status(404).json({ message: 'No User found with this username '});
            }
            res.json(dbThoughtData);
        }).catch(err => res.json(err));
    },

    // Update a users thought by its id
    updateToughtById({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        ).then(dbThoughtData => {
            if(!dbThoughtData){
                return res.status(404).json({ message: 'No thoughts found with this id' });
            }
            res.json(dbThoughtData);
        }).catch(err => res.status(400).json(err));
    },

    deleteThoughts({ params }, res){
        Thought.findOneAndDelete(
            { _id: params.id },
            { runValidators: true }
        ).then(dbThoughtData => {
            if(!dbThoughtData){
                return res.status(404).json({ message: "No thought data for this id!" })
            }
            res.json(dbThoughtData)
        }).catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController;