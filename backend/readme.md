# Emma Backend API

A simple Node.js backend for Emma

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
   CLIENT_URL=http://localhost:5173
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

#### Signup

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
      "message": "Welcome <name>",
      "user": {
        "username": "string",
        "name": "string",
        "email": "string"
      },
      "log": [
        { "_id": "chatId", "title": "Chat Title" }
      ]
    }
    ```

#### Login

- **POST `/api/users/login`**
  - **Body:**
    ```json
    {
      "credential": "username or email",
      "password": "string"
    }
    ```
  - **Success Response:**
    ```json
    {
      "status": "sucess",
      "user": {
        "username": "string",
        "name": "string",
        "email": "string"
      },
      "log": [
        { "_id": "chatId", "title": "Chat Title" }
      ]
    }
    ```
  - **Sets Cookie:** `token` (HttpOnly, SameSite=None, Secure, 7 days)

#### Logout

- **POST `/api/users/logout`**
  - **Clears Cookie:** `token`
  - **Success Response:**
    ```json
    {
      "status": "success",
      "message": "Logged out!"
    }
    ```

#### Edit Profile

- **PUT `/api/users/edit`** (Protected)
  - **Body:**
    ```json
    {
      "update": {
        "username": "string",
        "name": "string"
      }
    }
    ```
  - **Success Response:**
    ```json
    {
      "status": "success",
      "data": {
        "username": "string",
        "name": "string",
        "email": "string"
      }
    }
    ```

#### Username Availability

- **GET `/api/users/isusertaken?username=<username>`**
  - **Success Response (available):**
    ```json
    {
      "status": "success",
      "message": "<username> is available",
      "isTaken": false
    }
    ```
  - **If taken:**
    ```json
    {
      "status": "fail",
      "message": "username already taken",
      "isTaken": true
    }
    ```

---

### Auth/Validation

- **GET `/api/validate`** (Protected)
  - **Checks if the user is authenticated via cookie.**
  - **Success Response:**
    ```json
    {
      "status": "sucess"
    }
    ```
  - **Fail Response:**
    ```json
    {
      "status": "fail",
      "message": "Unauthorized access"
    }
    ```

---

### Chat Routes (Protected)

> All chat routes require authentication via the `token` cookie.

#### Fetch Chat

- **POST `/api/chat/fetch`**
  - **Body:**
    ```json
    { "id": "chatId" }
    ```
  - **Response:**
    ```json
    {
      "status": "success",
      "data": {
        "_id": "chatId",
        "userId": "userId",
        "title": "Chat Title",
        "history": [
          { "role": "user", "message": "..." },
          { "role": "model", "message": "..." }
        ]
      }
    }
    ```

#### Create Chat

- **POST `/api/chat/newchat`**
  - **Body:**
    ```json
    { "title": "string" }
    ```
  - **Response:**
    ```json
    {
      "status": "success",
      "chatId": "chatId"
    }
    ```

#### Delete Chat

- **DELETE `/api/chat/deletechat?id=<chatId>`**
  - **Response:**
    ```json
    {
      "status": "success",
      "message": "Chat deleted!"
    }
    ```

#### Rename Chat

- **PUT `/api/chat/renamechat/:name?id=<chatId>`**
  - **Response:**
    ```json
    {
      "status": "success",
      "message": "Chat renamed!"
    }
    ```

#### Get All Chats

- **GET `/api/chat/getchats`**
  - **Response:**
    ```json
    {
      "status": "success",
      "length": 2,
      "chats": [
        { "_id": "chatId", "title": "Chat Title" }
      ]
    }
    ```

---

### Ask Route (Protected)

- **POST `/api/ask/?id=<chatId>`**
  - **Body:**
    ```json
    { "message": "Your question here" }
    ```
  - **Response:**
    ```json
    {
      "status": "success",
      "response": "AI answer here"
    }
    ```

---

## Notes

- All requests and responses use JSON.
- Protected routes require a valid JWT token in the `token` cookie.
- Make sure MongoDB is running and `.env` is set up.
- For production, set cookies with `secure: true` and `sameSite: "none"`.

---