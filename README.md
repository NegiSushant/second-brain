# Live Demo

* url: https://mindvault01.vercel.app
* username: testdemo@email.com
* password: 123456789

---

# 🧠 MindVault — AI-Powered Second Brain
### Store • Organize • Search • Chat with Your Knowledge

![GitHub stars](https://img.shields.io/github/stars/your-repo?style=flat\&color=yellow)
![GitHub forks](https://img.shields.io/github/forks/your-repo?style=flat\&color=orange)
![GitHub issues](https://img.shields.io/github/issues/your-repo?style=flat\&color=red)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green)
![License](https://img.shields.io/badge/license-MIT-blue)

A modern **full-stack knowledge management system** where users can store tweets, YouTube, Notion docs, PDFs, summaries, and personal thoughts — all in one organized, searchable place.
MindVault focuses on **authentication, file storage, a clean UI, and intelligent content management** to simulate a real-world “Second Brain” application.

---

## 🚀 Overview

**MindVault** is a full-stack **Second Brain application** designed to store, organize, summarize, and retrieve your personal knowledge.

It acts as a centralized hub for:
* Tweets
* YouTube Vedios
* Notion docs
* document (upto 5MB size)
* code file
* Ask your brain (AI-Generated Summaries)

Built with a modern, scalable architecture featuring secure authentication, vector search, Retrieval-Augmented Generation (RAG), and OpenAI models.

---

## 🚀 Features

* **Authentication System** → Signin, Signup, HttpOnly Cookies(JWT Secrete)
* **Brain Page (`/brain`)** → Store tweets, YouTube, Notion docs, Documents and Codefile
* **File/Doc Uploads** → Upload documents directly to Supabase Storage
* **Ask Your Brain (`/brain/chat`)** → AI-powered chat with your personal knowledge using RAG
* **Semantic Search** → Retrieve the most relevant content using vector embeddings
* **Vector Database** → Generates and stores embeddings in Supabase Vector DB
* **Responsive Navbar** → Sticky, animated, and resizable

### Core Knowledge System:

* Save text, notes, summaries, and attachments
* Upload documents (PDFs, Images, World file, etc.) for long-term storage
* Retrieve and delete brain items
* Each user sees **their own data only**
* Clean UI built with Tailwind + Aceternity UI components

---

## 🧩 Tech Stack

* ⚛️ **React** → Component-driven UI + typescript
* 🎨 **TailwindCSS** → Utility-first modern styling
* 🌐 **Axios** → API communication
* 🔐 **Node.js + Express** → REST API backend
* 🛢️ **MongoDB** → Database
* 🔑 **JWT Auth** → Secure httpOnlyCookies token + refresh handling
* ☁️ **Supabase Storage** → File uploads (PDFs, images)
* 🤖 **OpenAI GPT-4o** → For intelligent response generation
* 🧩 **text-embedding-3-small**  → for embedding generation
* 🔍 **Retrieval-Augmented Generation (RAG)**  → Semantic search + context retrieval + LLM response generation
* 🚀 **Vercel + Render** → Production deployment

---

## 📸 Screenshots
<img width="1898" height="865" alt="image" src="https://github.com/user-attachments/assets/7bf98b08-8b75-443d-a089-62b854182e3f" />
<img width="1707" height="838" alt="image" src="https://github.com/user-attachments/assets/4ac8dccf-8b4a-4a76-adfc-6d73319f1e95" />
<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/4ee6bfc2-9de5-4d76-9469-5121b838db84" />
<img width="1918" height="864" alt="image" src="https://github.com/user-attachments/assets/abf79bb1-eec6-43de-87c8-d3493c160321" />
<img width="1917" height="857" alt="image" src="https://github.com/user-attachments/assets/8d16a59e-3922-4fdb-9890-2f033913030e" />

---
## 📂 Project Structure

**Feature Categories → Pages → Routes**

* `Auth` → User login, signup, session handling
* `Brain` → Store/fetch/delete knowledge items
* `Upload` → Supabase integrated file system
* `Chat` → AI chat powered by GPT-4o
* `Embedding`  → Generate embeddings using text-embedding-3-small
* `Vector DB` → Store embeddings in Supabase Vector Database

### Routes

* `/` → Homepage
* `/signin` → Login
* `/signup` → Register
* `/brain` → Main knowledge dashboard
* `/brain/:id` → View a specific stored item
* `/brain/chat` → ask your brain get response from your saved items
---

## 🏗️ What I Learned

* Implementing **httpOnlyCookies + JWT auth** in a real-world project
* Managing file uploads using **Supabase Storage**
* Building a scalable folder structure with **features → pages → routes**
* Integrating a React frontend with Node/Express/MongoDB backend
* Handling protected routes on both frontend and backend
* Designed and implemented an end-to-end **Retrieval-Augmented Generation (RAG) pipeline**
* Generated semantic embeddings using **OpenAI text-embedding-3-small**
* Built intelligent AI conversations using **OpenAI GPT-4o**
* Implemented semantic search with Supabase Vector Database
* Developed a modern chat experience with markdown rendering, source citations, thinking state, and persistent conversations
* Deploying a split system (frontend on Vercel, backend on Render)

---

## ⚙️ Environment Variables

### Frontend — `.env`

```
VITE_API_URL=http://localhost:3000/api/v1
```

### Backend — `.env`

```
DB_URL=your_mongodb_connection
JWT_PASSWORD=your-jwt-secret-key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
FRONTEND_URL=http://localhost:5173
OPENAI_API_KEY='our_key_here'
OPENAI_ENDPOINT='https://your-resource.openai.com/'
EMBEDDING_MODEL='openai/text-embedding-3-small'
MODEL_NAME='openai/gpt-4o'
```

---

## ⚡ Quick Start

Clone the repo and install dependencies:

```bash
git clone https://github.com/NegiSushant/second-brain.git
cd second-brain
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Your app should now be running at:

* Frontend → `http://localhost:5173`
* Backend → `http://localhost:3000`

---

## 🎉 Final Note

MindVault is your personal **Second Brain** — helping you store anything, remember everything, and learn faster.

---
