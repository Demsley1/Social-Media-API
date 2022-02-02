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

router
    .route('/:userId/friends/:friendId')
    .post(addUsersFriend)
    .delete(deleteUserFriend)

module.exports = router;
