const router = require('express').Router();
const {  
    getAllThoughts, 
    getThoughtById,
    
    } = require('../../controllers/thoughts')

router
    .route('/')
    .get(getAllThoughts)

router
    .route('/:id')
    .get(getThoughtById)

module.exports = router;