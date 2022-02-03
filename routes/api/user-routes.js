const router = require('express').Router();
const { 
        getAllUsers,
        getOneUser,
        addUser,
        updateUser,
        deleteUser,
        addUsersFriend,
        deleteUserFriend
    } = require('../../controllers/users');

    // Get all users, and post new users
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

    // Post user friend by ID, and delete user friend by ID
router
    .route('/:userId/friends/:friendId')
    .post(addUsersFriend)
    .delete(deleteUserFriend)

module.exports = router;
