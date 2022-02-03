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

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateToughtById)
    .delete(deleteThoughts)

router.route('/:thoughtId/reactions').post(addThoughtReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteThoughtReaction);

module.exports = router;