const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // who receives
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // who did it
  type: String, // 'like' | 'bookmark' | 'comment' | 'follow'
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Notification', NotificationSchema);
