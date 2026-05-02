# Messaging App

A full-stack messaging application where users can create accounts, customize profiles, and send messages to other users.

Typical use: sign up, browse users, start a conversation, and exchange messages backed by a REST API.

---

## What this project does

* Allows users to register and log in securely
* Lets users view a list of other users
* Supports sending and receiving messages
* Displays conversation history between users
* Enables basic profile customization
* Stores all data in a persistent database

---

## Tech stack

* React (frontend)
* Express.js (backend)
* Prisma ORM
* PostgreSQL
* Tailwind CSS
* JWT Authentication

---

## How it works (high level)

1. User registers or logs in
2. Backend authenticates and returns a JWT token
3. Token is stored on the client (localStorage)
4. User fetches list of available users
5. User selects another user to start a conversation
6. Messages are sent via API requests and stored in the database
7. Conversation history is fetched and displayed when needed

---

## Setup

### Backend

```bash
cd server
npm install
npx prisma migrate dev
node app.js
````

Create `.env`:

```
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
PORT=3000
```

---

### Frontend

```bash
cd client
npm install
npm run dev
```

Create `.env`:

```
VITE_API_URL=http://localhost:3000/api
```

---

## Key feature: authentication flow

Users are authenticated using JSON Web Tokens (JWT).



Protected requests include the token:

```js
fetch(`${API_URL}/messages`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

Backend verifies token before granting access to protected routes.

---

## Messaging system

Messages are stored with references to sender and receiver.

Basic structure:

```js
{
  id: 1,
  senderId: 2,
  receiverId: 5,
  message: "Hello",
  createdAt: "timestamp"
}
```

When a user opens a conversation:

* frontend requests messages between two users
* backend filters messages by sender/receiver IDs

---

## Why this exists

This project is a practical introduction to full-stack systems where multiple users interact with shared data.

Compared to simpler apps like todo lists, this project introduces:

* authentication and protected routes
* relational data (users ↔ messages)
* client-server coordination
* state synchronization between frontend and backend

It highlights limitations of REST APIs, especially for real-time systems.

---

## Things I don’t like

* No real-time updates (messages require manual refresh or re-fetch)
* JWT stored in localStorage (not the most secure approach)
* No message notifications
* No pagination for large message histories
* UI is basic and not fully optimized for all devices
* No typing indicators or read receipts

---

## Extra ideas (not implemented)

* Real-time messaging with WebSockets / Socket.IO
* Image/file sharing in chats
* Online/offline user status
* Friend system or contact list
* Group chats
* Push notifications

---

## Notes

This project focuses on core messaging functionality using a REST API.
The biggest limitation is the lack of real-time communication, which would require WebSockets or a similar technology.
