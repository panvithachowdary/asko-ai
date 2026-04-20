# Asko AI

Asko AI is a full-stack conversational web application that allows users to ask a question and receive an AI-generated response instantly. The system is designed around a simple interaction model where each request produces a single response.

---


## Overview

The application demonstrates complete integration of a modern frontend, backend, AI service, and database. A user submits a query through the interface, the backend processes it using an AI model, and the response is returned and displayed while also being stored for persistence.

---

## Features

* One question per request with a single AI-generated response
* Integration with Groq API (LLaMA 3.1 8B Instant model)
* Clean and focused user interface
* Backend validation and structured API handling
* Storage of queries and responses in MongoDB Atlas
* Independent deployment of frontend and backend

---

## Tech Stack

**Frontend**

* React (Vite)
* JavaScript
* CSS

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB Atlas

**AI Integration**

* Groq API
* Model: llama-3.1-8b-instant

**Deployment**

* Vercel

---

## Project Structure

```id="6y2jcf"
asko-ai/
│
├── frontend/
│   ├── src/
│   └── ...
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
│
├── README.md
└── vibecoded.md
```

---

## Design Decisions

The application intentionally avoids maintaining chat history to align with the requirement of processing a single query at a time. The separation of frontend and backend ensures modularity and simplifies deployment. Environment variables are used to securely manage sensitive configuration such as API keys and database credentials.

---

## Author

Panvitha Chowdary
