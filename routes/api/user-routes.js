const router = require('express').Router();
const { 
        getAllUsers,
        getOneUser,
        addUser,
        updateUser,
        deleteUser
    } = require('../../controllers/users');

    // get all users, and post new users
router
    .route('/')
    .get(getAllUsers)
    .post(addUser)

    // Get by IDs, put routes, and delete users
router
    .route('/:id')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;
