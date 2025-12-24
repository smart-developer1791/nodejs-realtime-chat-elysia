# Node.js Real-time Chat (Elysia Version)

![Node.js](https://img.shields.io/badge/node-%3E%3D22-green)
![Elysia](https://img.shields.io/badge/elysia-1.4.x-purple)
![WebSocket](https://img.shields.io/badge/websocket-enabled-blue)
![Tailwind](https://img.shields.io/badge/tailwind-styled-yellow)
![Render](https://img.shields.io/badge/render-deployed-brightgreen)

Minimal **real-time chat server** built on **Node.js**, **Elysia**, and **WebSocket**, with a modern **Tailwind CSS UI**.

- Uses **Elysia** as the HTTP framework with **`@elysiajs/node` adapter**  
- **WebSocket** enables real-time communication between multiple clients  
- **Tailwind CSS** for modern, responsive UI  
- Fully written in **TypeScript** for type safety and maintainability  
- No frontend build tools required — everything served from a single file  

---

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Run the server:

```bash
npm run dev
```

3. Open in your browser:

[http://localhost:8080/](http://localhost:8080/)

---

## Features

- Real-time messaging using **WebSocket**
- User nickname selection via a **modern modal**
- **Color-coded messages** per user
- Messages aligned left/right depending on sender
- **Auto-scroll** to latest message
- Responsive and mobile-friendly UI using Tailwind
- Chat history sent to new users

---

## Endpoints

| Path  | Method | Description                   |
|-------|--------|-------------------------------|
| `/`   | GET    | Serves chat HTML page         |
| `/ws` | WS     | WebSocket endpoint for chat   |

---

## Example Usage

1. Open the page in multiple browser tabs.
2. Enter a nickname in the modal.
3. Type a message in the input box and press **Enter** or click **Send**.
4. All connected users will receive messages in real-time.

---

## Client-side Notes

- Nickname modal prevents empty names.
- Messages are appended dynamically with **fade-in animation**.
- Each user gets a **unique background color**.
- Own messages are aligned to the right, others to the left.

---

## Server-side Notes

- Maintains a **Set of WebSocket clients**.
- Stores **chat history** and sends it to new connections.
- Broadcasts messages to all connected clients.
- Fully typed with TypeScript for better reliability.

---

## Technology Stack

- **Node.js >=22** – Runtime
- **Elysia 1.4.x** – Lightweight HTTP framework
- **@elysiajs/node** – Node.js adapter
- **@elysiajs/html** – Middleware to serve HTML
- **WebSocket** – Real-time communication
- **Tailwind CSS** – Modern UI styling
- **TypeScript 5.9.x** – Static typing

---

## TODO / Future Improvements

- [ ] **Timestamps** for messages (display time for each message)
- [ ] **Typing indicators** ("User is typing…") for better UX
- [ ] **Rooms / channels** support to separate conversations
- [ ] **List of active users** with colors / avatars
- [ ] **Message reactions / emojis** for richer interaction
- [ ] **Persist chat history** in a database (SQLite / MongoDB / PostgreSQL)
- [ ] **User authentication** for persistent accounts and secure access
- [ ] **Private messages / DMs** between users
- [ ] **Message search / filter** to quickly find content
- [ ] **UI enhancements**: animations, light/dark mode toggle, mobile improvements
- [ ] **Deployment scripts** for cloud platforms (Render, Vercel, Railway)
- [ ] **Accessibility improvements** (ARIA, keyboard navigation)

---

## Notes

- This project demonstrates a **minimal, one-file setup** for a real-time chat with modern, responsive UI.
- Fully extendable for learning, experimentation, or small production use.
- Uses **vanilla JS + Tailwind CSS**, no additional frontend framework required.
- Designed to be **mobile-friendly** and **easy to deploy** on cloud services.
- All chat logic is handled via **WebSocket** with **TypeScript** for type safety.

---

## Deploy in 10 seconds

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)
