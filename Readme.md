# Emma - an Ai nurse Mentor

Emma is a full-stack AI-powered chat application for nursing students, built with the MERN stack (MongoDB, Express, React, Node.js). Emma acts as a compassionate, knowledgeable mentor, answering questions and supporting users on their nursing journey.

---

## Features

- **User Authentication:** Signup, login, and protected routes using JWT and HttpOnly cookies.
- **Chat with Emma:** Ask questions and get AI-powered answers tailored for nursing students.
- **Chat History:** View, rename, and delete previous chats.
- **Profile Management:** Edit your profile details.
- **Responsive UI:** Built with React, Tailwind CSS, and Vite for fast development.

---

## Project Structure

```
backend/
  Controller/
  Middleware/
  Model/
  Routes/
  app.js
  server.js
  .env
frontend/
  src/
    Components/
    Pages/
    utils/
    main.jsx
    index.css
  .env
  vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

### 1. Clone the repository

```bash
git clone https://github.com/SangeethSDevan/Emma.git
cd emma-mern
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```
PORT=8000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` folder:

```
VITE_BASE_URL=http://localhost:8000
```

Start the frontend development server:

```bash
npm run dev
```

---

## Deployment

- **Frontend:** Deploy the `frontend/` folder using Vercel, Netlify, or your preferred static host.
- **Backend:** Deploy the `backend/` folder to a Node.js server (e.g., Render, Railway, Heroku, or your own VPS).
- **CORS:** Ensure your backend's `CLIENT_URL` and frontend's `VITE_BASE_URL` are set to your deployed URLs.
- **Cookies:** In production, set cookies with `secure: true` and `sameSite: "none"` for cross-site authentication.

---

## Environment Variables

**Backend (`backend/.env`):**
- `PORT` - Port for backend server (default: 8000)
- `MONGO_URL` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `CLIENT_URL` - Frontend URL for CORS

**Frontend (`frontend/.env`):**
- `VITE_BASE_URL` - Backend API base URL

---

## API Overview

See `backend/readme.md` for detailed API documentation.

---

## Troubleshooting

- **CORS or Cookie Issues:**  
  Ensure both frontend and backend use the correct URLs and CORS settings.  
  Use `withCredentials: true` in axios and set cookies with `httpOnly`, `secure`, and `sameSite` as needed.

- **MongoDB Connection:**  
  Make sure your `MONGO_URL` is correct and MongoDB is running.

- **Production:**  
  Use HTTPS for both frontend and backend to allow secure cookies.

