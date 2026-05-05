📘 Bookstore MERN Application
📌 Overview

This project is a full-stack Bookstore Web Application built using the MERN stack (MongoDB, Express, React, Node.js).

Users can browse books, add them to a cart, place orders, and download PDFs.
Admin can manage books, users, and orders.

🚀 Features
👤 User Features
Signup and Login
Browse books by category
Add to cart
Checkout and place orders
Payment system (Card / Cash on Delivery)
View order history
Download PDF books

👑 Admin Features
Add new books
Update book details
Delete books
View all users
View all orders
View contact messages

🏗️ Architecture
Frontend: React + Vite
Backend: Node.js + Express
Database: MongoDB

Flow:
User → Frontend → Backend → Database → Response → UI

📡 API Endpoints
User
POST /user/signup
POST /user/login
Books
GET /book
GET /book/:id
GET /book/recommend/:category
Orders
POST /order/create
GET /order/:userId
PUT /order/cancel/:orderId
Admin
GET    /admin/books
POST   /admin/books
PUT    /admin/books/:id
DELETE /admin/books/:id
GET    /admin/orders
GET    /admin/users
GET    /admin/messages

⚙️ Setup Instructions
1. Clone Repository
git clone https://github.com/vyasbhakti35-web/BOOK-STORE-APP.git
2. Backend Setup
cd backend
npm install
npm start
3. Frontend Setup
cd frontend
npm install
npm run dev

🔑 Environment Variables

Create .env file in backend:

PORT=4001
MONGODB_URI=mongodb://localhost:27017/bookStore

🧪 Testing
Login & Signup validation
Cart functionality
Order placement
Payment selection
PDF download

⚠️ Limitations
Payment system is simulated
No email notifications

🚀 Future Improvements
Integrate Stripe payment
Add ratings and reviews
Improve recommendation system
