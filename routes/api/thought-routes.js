const router = require('express').Router();
const {  
    getAllThoughts, 
    getThoughtById,
    createThought,
    updateToughtById,
    deleteThoughts,
    addThoughtReaction,
    deleteThoughtReaction
    } = require('../../controllers/thoughts')

    // route to get all thoughts, and post a new thought
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

    // routes to put update, get a single thought, and delete a thought, all by the thoughtId
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateToughtById)
    .delete(deleteThoughts)

// add a reaction to a thought by it's thoughtId
router.route('/:thoughtId/reactions').post(addThoughtReaction);

// delete a reaciton using the reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteThoughtReaction);

module.exports = router;