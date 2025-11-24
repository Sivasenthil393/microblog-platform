const User = require('../models/User');

// Login or create user
exports.loginUser = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'username required' });

    let user = await User.findOne({ username });
    if (!user) user = await User.create({ username });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('-__v')
      .populate('followers', 'username')
      .populate('following', 'username');

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get followers of a user
exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('followers', 'username');
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ followers: user.followers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Follow / Unfollow
exports.toggleFollow = async (req, res) => {
  try {
    const targetId = req.params.id;
    const { me } = req.body;

    if (!me) return res.status(400).json({ error: "me(username) required" });

    const meUser = await User.findOne({ username: me });
    if (!meUser) return res.status(404).json({ error: "Logged-in user not found" });

    if (meUser._id.toString() === targetId)
      return res.status(400).json({ error: "You cannot follow yourself" });

    const targetUser = await User.findById(targetId);
    if (!targetUser) return res.status(404).json({ error: "Target user not found" });

    let isFollowing;

    if (!meUser.following.includes(targetId)) {
      meUser.following.push(targetId);
      targetUser.followers.push(meUser._id);
      isFollowing = true;
    } else {
      meUser.following = meUser.following.filter(id => id.toString() !== targetId);
      targetUser.followers = targetUser.followers.filter(id => id.toString() !== meUser._id.toString());
      isFollowing = false;
    }

    await meUser.save();
    await targetUser.save();

    res.json({
      isFollowing,
      followersCount: targetUser.followers.length,
      followingCount: meUser.following.length,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
