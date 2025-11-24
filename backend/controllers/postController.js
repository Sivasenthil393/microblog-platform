const Post = require('../models/Post');

// Create post
exports.createPost = async (req, res) => {
  try {
    const { text, username } = req.body;
    if (!text || text.trim().length === 0 || text.length > 250)
      return res.status(400).json({ error: 'Invalid text' });

    const post = await Post.create({ text, username });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get posts by username
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ username: req.params.username }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Toggle Like
exports.toggleLike = async (req, res) => {
  try {
    const { userId } = req.body; // logged-in user ID
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const index = post.likedBy.indexOf(userId);

    if (index === -1) {
      post.likedBy.push(userId);
    } else {
      post.likedBy.splice(index, 1);
    }

    await post.save();

    res.json({
      liked: index === -1,
      likes: post.likedBy.length
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


// Toggle Bookmark
exports.toggleBookmark = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const index = post.bookmarkedBy.indexOf(userId);

    if (index === -1) {
      post.bookmarkedBy.push(userId);
    } else {
      post.bookmarkedBy.splice(index, 1);
    }

    await post.save();

    res.json({
      bookmarked: index === -1,
      bookmarks: post.bookmarkedBy.length
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

