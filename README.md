# Asko AI

Asko AI is a full-stack conversational web application that allows users to submit a single query and receive a structured AI-generated response instantly.

The system follows a strict one-question → one-response interaction model, focusing on clarity, performance, and clean architecture.

---

## Live Deployment

Frontend: https://asko-ai-8bpp.vercel.app  
Backend: https://asko-ai.vercel.app  

---

## Overview

This project demonstrates end-to-end integration of a modern web application stack, combining frontend UI, backend logic, AI processing, and database storage.

Workflow:

1. User submits a question through the frontend
2. Backend validates the request
3. Groq API generates a response using the AI model
4. Response is returned to the frontend
5. Question and response are stored in MongoDB Atlas

---

## Features

- Single-query interaction model (no chat history)
- Fast AI response using LLaMA 3.1 8B Instant model
- Clean and focused user interface
- Backend validation and error handling
- Persistent storage of queries and responses
- Independent deployment of frontend and backend

---

## Tech Stack

### Frontend
- React (Vite)
- JavaScript
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### AI Integration
- Groq API  
- Model: llama-3.1-8b-instant

### Deployment
- Vercel (separate deployments for frontend and backend)

---

## Project Structure
