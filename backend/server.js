// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const commentsRoute = require('./routes/comments');

const app = express();
app.use(cors());
app.use(express.json());

// ------------------ ROUTES ------------------
app.use('/api/posts', postsRoute);
app.use('/api/users', usersRoute);
app.use("/api/comments", require("./routes/comments"));

app.get('/', (req, res) => res.send('MicroBlog API is running'));

// ------------------ MONGO & SERVER START ------------------
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error', err);
});
