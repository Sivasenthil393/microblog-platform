const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// GET comments for a post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error("GET comments error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// CREATE a comment for a post
router.post("/:postId", async (req, res) => {
  try {
    const { username, text } = req.body;

    if (!text || !username) {
      return res.status(400).json({ error: "Username and text required" });
    }

    const newComment = await Comment.create({
      postId: req.params.postId,
      username,
      text,
    });

    res.json(newComment);
  } catch (err) {
    console.error("POST comment error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
