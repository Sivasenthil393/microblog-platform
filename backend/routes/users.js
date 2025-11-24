const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ---------------------------
// Login / Create User
// ---------------------------
router.post('/login', userController.loginUser);

// ---------------------------
// Get user profile
// ---------------------------
router.get('/:username', userController.getUserProfile);

// ---------------------------
// Get followers of a user
// ---------------------------
router.get('/:id/followers', userController.getFollowers);

// ---------------------------
// Follow / Unfollow user
// ---------------------------
// body = { me: "loggedInUsername" }
router.put('/:id/follow', userController.toggleFollow);

module.exports = router;
