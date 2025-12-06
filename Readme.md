# 🏗️ Mega Planner — UK Building Regulations Assistant

Mega Planner is a **full-stack AI-powered planning assistant** designed to help users understand and work with **UK Building Regulations (Approved Documents B, F, and L)** in a safe, professional, and non-hallucinating way.

The system consists of:

* ✅ **Node.js + Express backend**
* ✅ **MongoDB (Mongoose)**
* ✅ **React (Vite) frontend**
* ✅ **Groq LLM integration**
* ✅ **JWT-based authentication**
* ✅ **Automated testing (backend & frontend)**
* ✅ **GitHub Actions CI**

---

## ✨ Key Features

### 🔐 Authentication

* User **Sign-up** and **Sign-in**
* Secure password hashing with **bcrypt**
* JWT-based authentication
* Protected routes for chat access

### 💬 AI Chat (Core Feature)

* AI assistant specialised in **UK Building Regulations**
* Strict system prompt:

  * Uses **ONLY Approved Documents B, F, and L**
  * No invented numeric values or assumptions
  * Clearly states when a definitive answer cannot be found
* Professional, concise, regulation-compliant responses

### 🧠 LLM Safety & Prompt Engineering

* Strong **system prompt** enforced server-side
* Prevents hallucination and fabricated compliance advice
* Forces clear disclaimers where regulations are unclear
* Production-safe behaviour for regulatory domains

---

## 🧩 Tech Stack

### Backend

* **Node.js**
* **Express**
* **MongoDB + Mongoose**
* **JWT**
* **Groq API**
* **node-fetch**

### Frontend

* **React (Vite)**
* **React Router**
* **Context API**
* Modern chat UI (bubble-based)

### Testing & CI

* Backend:

  * `node:test`
  * `supertest`
  * `mongodb-memory-server`
* Frontend:

  * `vitest`
  * `@testing-library/react`
* CI:

  * **GitHub Actions**

---

## 📁 Project Structure

```
mega-planner/
│
├── mega-planner-backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── utils/
│   ├── test/
│   ├── package.json
│   └── .env.example
│
├── mega-planner-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── state/
│   │   ├── api.js
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
└── .github/
    └── workflows/
        └── ci.yml
```

---

## ⚙️ Environment Variables

### Backend `.env`

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<db>
JWT_SECRET=your_long_random_secret

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=mixtral-8x7b-32768

BASE_SYSTEM_PROMPT=You are MegaPlannerBot, an assistant helping with UK Building Regulations...
```

### Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🚀 Getting Started

### 1️⃣ Backend Setup

```bash
cd mega-planner-backend
npm install
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

### 2️⃣ Frontend Setup

```bash
cd mega-planner-frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## ✅ Automated Testing

### Backend Tests

```bash
cd mega-planner-backend
npm test
```

Includes:

* Auth flow tests
* JWT protection tests
* Chat endpoint tests
* Groq API mocked safely

### Frontend Tests

```bash
cd mega-planner-frontend
npm test
```

Includes:

* Component rendering tests
* Chat UI tests

---

## 🔄 Continuous Integration (CI)

GitHub Actions pipeline runs automatically on:

* `push`
* `pull_request`

✅ Installs dependencies
✅ Runs backend tests
✅ Runs frontend tests
✅ Fails the build on any test failure

Workflow file:

```
.github/workflows/ci.yml
```

---

## 🛡️ Security & Reliability

* Passwords hashed with **bcrypt**
* JWT authorization enforced on protected routes
* In-memory MongoDB used for tests (no data leakage)
* LLM output constrained by strict system prompt
* No regulatory hallucinations allowed

---

## 🧠 Intended Use & Disclaimer

Mega Planner is designed to **assist understanding** of UK Building Regulations.
It **does not replace** professional advice from:

* Building Control Officers
* Approved Inspectors
* Architects or Engineers

For legally binding decisions, always consult the official Approved Documents and qualified professionals.

---

## 📜 License

MIT License

---

## 👤 Author

Built by **Muhammad Faizan Asim**
UK-focused AI & software systems project
2025

