# Emma Backend API

A simple Node.js backend for Emma, an AI nurse mentor, using Express and MongoDB.

---

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```
2. Create a `.env` file with:
   ```
   PORT=8000
   MONGO_URL=your_mongodb_url
   JWT_SECRET=your_jwt_secret
   ```
3. Start the server:
   ```
   npm start
   ```

---

## API Routes

### Health Check

- **GET `/api/isalive`**
  - **Response:**
    ```json
    {
      "status": "success",
      "message": "I am alive"
    }
    ```

---

### User Routes

- **POST `/api/users/signup`**
  - **Body:**
    ```json
    {
      "username": "string",
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Success Response:**
    ```json
    {
      "status": "sucess",
      "message": "Profile created successfully"
    }
    ```

- **POST `/api/users/login`**
  - **Body:**
    ```json
    {
      "cerdinal": "username or email",
      "password": "string"
    }
    ```
  - **Success Response:**
    ```json
    {
      "status": "sucess",
      "token": "jwt_token",
      "log": [
        { "_id": "chatId", "title": "Chat Title" }
      ]
    }
    ```

---

### Chat Routes (Require Auth)

Add header: `Authorization: Bearer <token>`

- **POST `/api/chat/fetch`**
  - **Body:** `{ "chatId": "string" }`
  - **Response:** Chat data

- **POST `/api/chat/newchat`**
  - **Body:** `{ "title": "string" }`
  - **Response:** New chat info

- **DELETE `/api/chat/deletechat`**
  - **Body:** `{ "chatId": "string" }`
  - **Response:** Delete status

- **PUT `/api/chat/renamechat/:name`**
  - **Body:** `{ "chatId": "string" }`
  - **Response:** Rename status

- **GET `/api/chat/getchats`**
  - **Response:** List of user's chats

---

### Ask Route (Require Auth)

- **POST `/api/ask`**
  - **Body:**
    ```json
    {
      "chatId": "string",
      "question": "string"
    }
    ```
  - **Response:** AI answer and chat update

---

## Notes

- All requests and responses use JSON.
- Protected routes require a valid JWT token.
- Make sure MongoDB is running and `.env` is set up.

---