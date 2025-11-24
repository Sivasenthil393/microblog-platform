📘 MicroBlog – A Minimal Social Feed App

A lightweight micro-blogging platform built using the MERN stack.
Users can post updates, like, bookmark, and comment with a clean, modern interface.

🚀 Features
✅ Authentication

Login using just a username (no password needed)

Auto-creates user if username doesn't exist

📝 Posts

Create posts (max 250 characters)

Like / Unlike posts

Bookmark / Remove bookmark

View all posts in reverse chronological order

💬 Comments

Add comments on any post

View the comment list for each post

👤 Profile

View user profile

See all posts made by that user

(✔️ No followers / following system)

🎨 UI / UX

Modern TailwindCSS UI

Animated login page

Smooth hover effects

Fully responsive

🛠️ Tech Stack

Frontend

React.js

React Router

Axios

Tailwind CSS

React Icons

Backend

Node.js

Express.js

MongoDB + Mongoose

📂 Folder Structure
microblog/
 ├── backend/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── server.js
 │   └── .env
 │
 └── frontend/
     ├── src/
     │   ├── components/
     │   ├── pages/
     │   ├── services/api.js
     │   ├── App.js
     │   └── index.js
     └── tailwind.config.js

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/microblog.git
cd microblog

▶️ Backend Setup
Install dependencies
cd backend
npm install

Create .env
MONGO_URI=your_mongodb_connection_string
PORT=5001

Start backend
npm start

💻 Frontend Setup
Install dependencies
cd frontend
npm install

Start frontend
npm start


Frontend: http://localhost:3000

Backend: http://localhost:5001

🧪 API Endpoints Overview
Users
POST /api/users/login
GET  /api/users/:username

Posts
POST  /api/posts
GET   /api/posts
GET   /api/posts/user/:username
PUT   /api/posts/:id/like
PUT   /api/posts/:id/bookmark

Comments
GET  /api/comments/:postId
POST /api/comments/:postId

📸 Screenshots (Optional)

You can include:

Login UI

Feed UI

Post card

Profile page

![Feed](./screenshots/feed.png)

🧑‍💻 Contributing

Pull requests are welcome!

📜 License

Released under the MIT License.
