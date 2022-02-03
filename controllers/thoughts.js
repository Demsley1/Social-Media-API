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

    // create a reaction to a thought
    addThoughtReaction({ body, params }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        ).then(dbThoughtData => {
            if(!dbThoughtData){
                return res.status(404).json({ message: "No thought found with this id!" });
            }
            res.json(dbThoughtData)
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

    // delete a thought
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
    },

    // remove a thought by its id
    deleteThoughtReaction({ params }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
        ).then(dbThoughtData => {
            if(!dbThoughtData){
                return res.status(404).json({ message: "No thoughts found at this id!" });
            }
            res.json(dbThoughtData);
        }).catch(err => res.json(err));
    }
}

module.exports = thoughtController;