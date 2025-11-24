const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 250 },
  username: { type: String, required: true },

  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", PostSchema);
