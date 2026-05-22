# 🚀 Studius - AI Notes Summarizer

Studius is a modern **AI-powered notes productivity web app** that converts raw study material into **structured summaries, key points, and quizzes** with a clean and minimal UI.

## ✨ Features

- ✅ **AI Summarization** — Paste your notes, get a clear summary
- ✅ **Key Points Extraction** — Get bullet-point highlights from any text
- ✅ **Quiz Generator** — Auto-generate questions with customizable difficulty and question count
- ✅ **Quiz Timer** — Toggle timer on/off while attempting quizzes
- ✅ **Score Tracking** — Save your quiz scores and view stats on your Dashboard
- ✅ **History Management** — View, search, edit, or delete past summaries and quizzes
- ✅ **Copy & Export** — Copy summary to clipboard or export as .txt file
- ✅ **File Upload** — Upload .txt, .pdf, or .docx files and summarize instantly
- ✅ **Regenerate** — Re-generate summaries, key points, or quizzes with one click
- ✅ **Dark Mode** — Toggle between light and dark themes
- ✅ **Leaderboard** — Compete with other users, see top quiz scorers
- ✅ **Responsive Design** — Fully works on mobile, tablet, and desktop
- ✅ **User Authentication** — Register, login, and personalized content

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 8, MUI 9, Recharts |
| **Backend** | Node.js, Express 5, Mongoose 9 |
| **Database** | MongoDB Atlas |
| **AI API** | OpenRouter (GPT-3.5-Turbo) |
| **Deployment** | Vercel (Frontend) + Render (Backend) |

## 🚀 Deployment

- **Frontend (Vercel)**: https://studius-ai-notes-summerizer.vercel.app
- **Backend (Render)**: https://studius-ai-notes-summerizer.onrender.com

## 🛠️ Local Setup

### Prerequisites
```bash
node >= 18
npm
```

### Backend Setup
```bash
git clone https://github.com/Sahil071803/studius-ai-notes-summerizer.git
cd studius-ai-notes-summerizer/Backend/Server
cp .env.example .env  # Add your MONGO_URI and OPENROUTER_API_KEY
npm install
npm run dev
```

### Frontend Setup
```bash
cd studius-ai-notes-summerizer/Frontend/Client
npm install
npm run dev
```

## 📁 Project Structure

```
studius-ai-notes-summerizer/
├── Backend/
│   └── Server/
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── server.js
└── Frontend/
    └── Client/
        ├── public/
        ├── src/
        │   ├── components/
        │   ├── pages/
        │   ├── services/
        │   └── App.jsx
        └── index.html
```

## 🔑 Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI |
| `JWT_SECRET` | Secret for JWT tokens |
| `CLIENT_URL` | Frontend URL for CORS |

### Frontend
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |

## 📬 Feedback

Found a bug or have a suggestion? Submit feedback directly from the app using the purple Feedback button!
