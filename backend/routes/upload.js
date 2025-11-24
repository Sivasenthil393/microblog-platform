// backend/routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = new CloudinaryStorage({ cloudinary, params: { folder: 'microblog' }});
const parser = multer({ storage });

const auth = require('../middleware/auth');

router.post('/profile', auth, parser.single('image'), async (req, res) => {
  // req.file.path contains URL
  const user = await User.findById(req.user.id);
  user.profileImage = req.file.path;
  await user.save();
  res.json({ profileImage: user.profileImage });
});
module.exports = router;
