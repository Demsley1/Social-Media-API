const router = require('express').Router();
const { 
        getAllUsers,
        getOneUser,
        addUser
    } = require('../../controllers/users');

router
    .route('/')
    .get(getAllUsers)
    .post(addUser)

router
    .route('/:id')
    .get(getOneUser)


module.exports = router;
