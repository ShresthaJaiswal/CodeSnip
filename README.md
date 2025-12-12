# CodeSnip - AI-Powered Code Snippet Manager

A modern, full-stack web application for developers to save, organize, and search their code snippets with AI-powered auto-tagging.


## 📖 About

**CodeSnip** was born out of a personal need - as a developer, I constantly found myself searching through old projects, Stack Overflow answers, and scattered notes trying to find that one piece of code I wrote months ago. I wanted a clean, fast, and intuitive way to save and organize code snippets with powerful search capabilities.
Built during my transition from college to the professional world, this project showcases modern full-stack development practices and my passion for creating tools that developers actually want to use.

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

## Tech Stack

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
- **OpenAI API** - AI-powered features *(optional)*
- **express-rate-limit** - API rate limiting

### DevOps & Tools
- **Git** - Version control
- **npm** - Package management
- **Nodemon** - Auto-restart development server
- **Prisma Studio** - Database GUI

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm**
- **PostgreSQL** (v14 or higher) - or use Neon for cloud database
- **Git**
- **OpenAI API Key** (for AI features - optional)

## Quick Start

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


## Usage

### Creating Your First Snippet

1. **Register an account** or **Login** if you already have one
2. Click **"New Snippet"** button
3. Fill in the details:   
   - **Title:** Name your snippet   
   - **Language** Select from 25+ languages   
   - **Code:** Paste or write your code (Monaco Editor)   
   - **Description:** Briefly describe what it does   
   - **Tags:** Add tags for organization (e.g., `algorithm`, `react`, `api`)
4. Click **"Create"** 
5. Your snippet appears in the dashboard!

### Searching & Filtering

- Use the **search bar** to find snippets by title, description, or code
- **Filter by language** using the dropdown
- Click on any snippet to view, edit, or delete

### Dark Mode

Click the **🌙 moon icon** in the navbar to toggle dark mode. Your preference is saved automatically!

## Project Structure

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

## API Endpoints

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


## Roadmap

### ✅ Completed Features

- [x] User authentication (register/login)
- [x] CRUD operations for snippets
- [x] Monaco code editor integration
- [x] Search and filter functionality
- [x] Tag-based organization
- [x] Dark/Light mode
- [x] Responsive design
- [x] AI auto-tagging (optional)

### 🚧 In Progress

- [ ] Deployment to production (Vercel + Render + Neon)
- [ ] Custom domain setup

## 👨‍💻 Author

**Shrestha Jaiswal**
- GitHub: [@ShresthaJaiswal](https://github.com/ShresthaJaiswal)
- LinkedIn: [shresthajaiswal](https://linkedin.com/in/shresthajaiswal)
- Email: jaiswallshresthaa@gmail.com

## Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI](https://openai.com/)
- [Prisma](https://www.prisma.io/)

---
