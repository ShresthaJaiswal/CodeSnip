# 🚀 CodeSnip - AI-Powered Code Snippet Manager

A modern, full-stack web application for developers to save, organize, and search their code snippets with AI-powered auto-tagging.

![CodeSnip Banner](https://via.placeholder.com/1200x400/4F46E5/ffffff?text=CodeSnip+-+Your+Personal+Code+Library)

## ✨ Features

### Core Functionality
- 📝 **Rich Code Editor** - Monaco Editor with syntax highlighting for 50+ languages
- 🏷️ **Smart Tagging** - AI-powered auto-tagging using OpenAI GPT
- 🔍 **Powerful Search** - Full-text search across code and descriptions
- 🎨 **Syntax Highlighting** - Beautiful code rendering with Prism.js
- 📋 **One-Click Copy** - Instant clipboard copy functionality
- 🌓 **Dark/Light Mode** - Eye-friendly themes for day and night coding
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile

### Advanced Features
- 🤖 **AI Auto-Tagging** - Automatically suggests relevant tags and descriptions
- 🔗 **Shareable Snippets** - Generate unique URLs to share with team members
- 📊 **Snippet Analytics** - Track your most-used languages and tags
- 📂 **Folder Organization** - Organize snippets into custom folders
- ⚡ **Quick Actions** - Keyboard shortcuts for power users
- 🔒 **Secure Authentication** - JWT-based auth with bcrypt password hashing

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Monaco Editor** - VS Code's editor component
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Beautiful notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Prisma** - Modern ORM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **OpenAI API** - AI-powered features
- **express-rate-limit** - API rate limiting

### DevOps & Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **Neon** - Serverless PostgreSQL
- **GitHub Actions** - CI/CD (optional)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v14 or higher) - or use Neon for cloud database
- **Git**
- **OpenAI API Key** (for AI features - optional)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/codesnip.git
cd codesnip
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/codesnip"
JWT_SECRET="your-super-secret-jwt-key-change-this"
OPENAI_API_KEY="sk-your-openai-api-key"
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Run database migrations:
```bash
npx prisma migrate dev
npx prisma generate
```

Start the backend server:
```bash
npm run dev
```
Backend will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```
Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
codesnip/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── snippetController.js
│   │   │   └── aiController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── snippets.js
│   │   │   └── ai.js
│   │   ├── utils/
│   │   │   ├── openai.js
│   │   │   └── validation.js
│   │   └── server.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── SnippetList.jsx
│   │   │   │   └── SnippetCard.jsx
│   │   │   ├── Editor/
│   │   │   │   ├── CodeEditor.jsx
│   │   │   │   └── SnippetForm.jsx
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   └── Shared/
│   │   │       ├── SearchBar.jsx
│   │   │       ├── TagInput.jsx
│   │   │       └── Loading.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Snippets
- `GET /api/snippets` - Get all snippets (with pagination & filters)
- `GET /api/snippets/:id` - Get single snippet
- `POST /api/snippets` - Create new snippet
- `PUT /api/snippets/:id` - Update snippet
- `DELETE /api/snippets/:id` - Delete snippet
- `GET /api/snippets/search?q=query` - Search snippets

### AI Features
- `POST /api/ai/auto-tag` - Get AI-suggested tags and description
- `POST /api/ai/smart-search` - AI-powered semantic search

## 🎨 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x500/4F46E5/ffffff?text=Dashboard+View)

### Code Editor
![Editor](https://via.placeholder.com/800x500/10B981/ffffff?text=Code+Editor)

### Search & Filter
![Search](https://via.placeholder.com/800x500/F59E0B/ffffff?text=Search+%26+Filter)

## 🚢 Deployment Guide

### Deploy Backend to Render

1. Create account on [Render](https://render.com)
2. Create new "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Build Command: `cd backend && npm install && npx prisma generate`
   - Start Command: `cd backend && npm start`
5. Add environment variables
6. Deploy!

### Deploy Frontend to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. From frontend folder: `vercel`
3. Follow prompts
4. Set environment variable: `REACT_APP_API_URL`

### Database on Neon

1. Create account on [Neon](https://neon.tech)
2. Create new project
3. Copy connection string
4. Update `DATABASE_URL` in backend `.env`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shrestha Jaiswal**
- GitHub: [@ShresthaJaiswal](https://github.com/ShresthaJaiswal)
- LinkedIn: [shresthajaiswal](https://linkedin.com/in/shresthajaiswal)
- Email: jaiswallshresthaa@gmail.com

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI](https://openai.com/)
- [Prisma](https://www.prisma.io/)

## 📊 Project Stats

![GitHub Stars](https://img.shields.io/github/stars/yourusername/codesnip?style=social)
![GitHub Forks](https://img.shields.io/github/forks/yourusername/codesnip?style=social)
![GitHub Issues](https://img.shields.io/github/issues/yourusername/codesnip)
![GitHub License](https://img.shields.io/github/license/yourusername/codesnip)

---

**Built with ❤️ by developers, for developers**
