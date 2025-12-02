url: https://mindvault01.vercel.app
# 🧠 MindVault — Second Brain Platform

Store. Organize. Understand. Remember.

![GitHub stars](https://img.shields.io/github/stars/your-repo?style=flat\&color=yellow)
![GitHub forks](https://img.shields.io/github/forks/your-repo?style=flat\&color=orange)
![GitHub issues](https://img.shields.io/github/issues/your-repo?style=flat\&color=red)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📸 Screenshots
<img width="1898" height="865" alt="image" src="https://github.com/user-attachments/assets/7bf98b08-8b75-443d-a089-62b854182e3f" />
<img width="1707" height="838" alt="image" src="https://github.com/user-attachments/assets/4ac8dccf-8b4a-4a76-adfc-6d73319f1e95" />
<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/4ee6bfc2-9de5-4d76-9469-5121b838db84" />
<img width="1918" height="864" alt="image" src="https://github.com/user-attachments/assets/abf79bb1-eec6-43de-87c8-d3493c160321" />
<img width="1917" height="857" alt="image" src="https://github.com/user-attachments/assets/8d16a59e-3922-4fdb-9890-2f033913030e" />

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

Built with a modern, scalable stack and secure authentication layers.

---

## 🧩 Features

### 🔐 Secure Authentication

* JWT access tokens
* Refresh tokens
* Role-based access
* Persistent sessions
* Protected `/user/me` route

### 🧠 Brain Page (Core Feature)

* Store tweets
* Store YouTube notes
* Store PDFs
* Store text snippets
* AI-based summary generation
* Organized content view

### 🗂️ Supabase File Storage

* PDF + document uploads
* Secure bucket storage
* Delete + fetch support

### 🧰 Frontend Features

* React + Tailwind modern UI
* Framer Motion animations
* SweetAlert2 prompts
* Sticky + resizable navbar
* Global refresh trigger
* Fully responsive

### 🏗️ Backend Features

* Node.js + Express REST API
* MongoDB + Mongoose
* Supabase storage integration
* Protected routes
* User session handling
* Production CORS for Vercel → Render

---

## 🛠️ Tech Stack

### Frontend

* React.js
* TailwindCSS
* Framer Motion
* React Router
* Axios
* SweetAlert2

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JSON Web Tokens (JWT)
* Bcrypt
* Supabase Storage
* CORS

### DevOps / Hosting

* Vercel (Frontend)
* Render (Backend)
* Supabase (File Storage)

---

## 📁 Folder Structure

```
/client
 ├── src
 │   ├── components
 │   ├── pages
 │   ├── hooks
 │   ├── context
 │   ├── utils
 │   ├── App.tsx
 │   └── main.tsx

/server
 ├── controllers
 ├── routes
 ├── middleware
 ├── models
 ├── utils
 ├── server.js
 └── config
```

---

## ⚙️ Environment Variables

### Frontend — `.env`

```
VITE_BACKEND_URL=https://second-brain-backend.onrender.com/api/v1
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
```

### Backend — `.env`

```
PORT=8000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your-secret-key
REFRESH_TOKEN_SECRET=your-refresh-secret
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
CLIENT_URL=https://mindvault01.vercel.app
```

---

## 🏗️ Setup Instructions

### 1️⃣ Clone the project

```bash
git clone https://github.com/your-repo/mindvault.git
cd mindvault
```

### 2️⃣ Install dependencies

#### Frontend

```bash
cd client
npm install
npm run dev
```

#### Backend

```bash
cd server
npm install
npm run dev
```

### 3️⃣ Run the app

* Frontend → [http://localhost:5173](http://localhost:5173)
* Backend → [http://localhost:8000](http://localhost:8000)

---

## 🔐 API Endpoints

### Auth Routes

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| POST   | `/api/v1/user/signup` | Register user      |
| POST   | `/api/v1/user/login`  | Login              |
| GET    | `/api/v1/user/me`     | Get logged-in user |

### Brain Routes

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| POST   | `/api/v1/brain/create` | Add new brain item |
| GET    | `/api/v1/brain/`       | Get all items      |
| DELETE | `/api/v1/brain/:id`    | Delete item        |

---

## ☁️ Deployment Notes

### Vercel (Frontend)

* Add frontend env: `VITE_BACKEND_URL`
* Enable CORS in backend

### Render (Backend)

* Add env variables
* Enable web service
* Allow POST, GET requests

### Supabase

* Create bucket: `Mindvault`
* Upload PDFs/documents

---

## 🤝 Contributing

PRs are always welcome.
Make sure code is clean, commented, and properly formatted.

---

## 📄 License

Licensed under the **MIT License**.

---

## 🎉 Final Note

MindVault is your personal **Second Brain** — helping you store anything, remember everything, and learn faster.

---

If you want, I can also generate:
✅ A logo
✅ Architecture diagram
✅ API documentation
✅ More screenshots

Just tell me!
