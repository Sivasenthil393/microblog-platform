const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// ---------------------------
// Posts
// ---------------------------

// Create post
router.post('/', postController.createPost);

// Get all posts (reverse chronological)
router.get('/', postController.getAllPosts);

// Get posts by username
router.get('/user/:username', postController.getUserPosts);

// Toggle Like
router.put('/:id/like', postController.toggleLike);

// Toggle Bookmark
router.put('/:id/bookmark', postController.toggleBookmark);

module.exports = router;
