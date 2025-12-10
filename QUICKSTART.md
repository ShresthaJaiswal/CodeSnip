# ⚡ CodeSnip - Quick Start Guide

Get CodeSnip up and running in 5 minutes!

## 🎯 What You'll Build

A professional full-stack application with:
- ✅ User authentication (register/login)
- ✅ Code snippet CRUD operations
- ✅ Monaco code editor (VS Code's editor)
- ✅ AI-powered auto-tagging
- ✅ Search and filter functionality
- ✅ Dark/Light mode
- ✅ Fully responsive design
- ✅ Production-ready deployment

## 📋 Prerequisites (Install These First)

```bash
# Check if you have Node.js (v18+)
node --version

# Check if you have npm
npm --version

# Check if you have PostgreSQL
psql --version
```

Don't have them? Install:
- **Node.js**: https://nodejs.org (get LTS version)
- **PostgreSQL**: https://www.postgresql.org/download/

## 🚀 Option 1: Automatic Setup (Recommended)

```bash
# Clone or download the project
cd codesnip-project

# Run setup script (Linux/Mac)
./setup.sh

# Or manually (Windows/Linux/Mac)
cd backend && npm install && cd ../frontend && npm install
```

## 🔧 Option 2: Manual Setup

### Step 1: Database Setup

```bash
# Create database
createdb codesnip

# Or using psql
psql -U postgres
CREATE DATABASE codesnip;
\q
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and update:
# DATABASE_URL="postgresql://username:password@localhost:5432/codesnip"
# JWT_SECRET="your-random-secret-here-minimum-32-characters"

# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Start backend
npm run dev
```

Backend should now be running at `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# (Default settings should work)

# Start frontend
npm start
```

Frontend should open at `http://localhost:3000`

## ✅ Verify Installation

1. **Backend Health Check**:
   ```bash
   curl http://localhost:5000/health
   ```
   Should return: `{"success":true,"message":"CodeSnip API is running",...}`

2. **Frontend**: Open http://localhost:3000
   - Should see login page
   - No console errors

## 🎮 Test the App

### 1. Register Account
```
Navigate to: http://localhost:3000/register
Email: test@example.com
Username: testuser
Password: password123
```

### 2. Create First Snippet
Click "New Snippet" and try:

```javascript
// Quick Sort Implementation
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[arr.length - 1];
  const left = arr.filter((x, i) => x <= pivot && i < arr.length - 1);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

- **Title**: "Quick Sort Algorithm"
- **Language**: javascript
- **Tags**: algorithm, sorting, recursion
- Click "AI Suggestions" to test AI features (requires OpenAI key)

### 3. Test Features
- ✅ Create multiple snippets
- ✅ Search for snippets
- ✅ Edit existing snippet
- ✅ Delete snippet
- ✅ Toggle dark/light mode
- ✅ Copy code to clipboard

## 🤖 Enable AI Features (Optional)

1. Get OpenAI API key: https://platform.openai.com/api-keys
2. Add to `backend/.env`:
   ```
   OPENAI_API_KEY=sk-your-api-key-here
   ```
3. Restart backend: `npm run dev`
4. Test "AI Suggestions" button in snippet form

## 🐛 Troubleshooting

### "Cannot connect to database"
```bash
# Check PostgreSQL is running
pg_isready

# Check connection string in backend/.env
# Format: postgresql://user:pass@localhost:5432/dbname
```

### "Module not found" errors
```bash
# Re-install dependencies
cd backend && npm install
cd ../frontend && npm install
```

### Port already in use
```bash
# Backend (port 5000)
lsof -ti:5000 | xargs kill -9

# Frontend (port 3000)
lsof -ti:3000 | xargs kill -9
```

### Prisma errors
```bash
cd backend
npx prisma generate
npx prisma migrate reset  # Warning: deletes all data
```

## 📚 Next Steps

### Development:
- [ ] Add more snippets
- [ ] Customize UI colors in `tailwind.config.js`
- [ ] Add more languages to snippet form
- [ ] Implement snippet folders
- [ ] Add export/import features

### Deployment:
- [ ] Follow `DEPLOYMENT_GUIDE.md`
- [ ] Deploy backend to Render
- [ ] Deploy frontend to Vercel
- [ ] Set up Neon database
- [ ] Configure custom domain

## 📖 Documentation

- **README.md** - Project overview and features
- **IMPLEMENTATION_GUIDE.md** - Detailed component documentation
- **DEPLOYMENT_GUIDE.md** - Step-by-step deployment
- **API Documentation** - Check backend routes in `src/routes/`

## 🎯 For Job Application

This project demonstrates:
- ✅ Full-stack JavaScript (Node.js + React)
- ✅ Database design (PostgreSQL + Prisma)
- ✅ RESTful API development
- ✅ Authentication & Authorization
- ✅ Modern frontend (React Hooks, Context API)
- ✅ Third-party API integration (OpenAI)
- ✅ Production deployment experience
- ✅ Clean, maintainable code

## 💡 Tips for Interview

**When discussing this project:**

1. **Backend Architecture**:
   - "Used Express.js with Prisma ORM for type-safe database queries"
   - "Implemented JWT authentication with bcrypt password hashing"
   - "Added rate limiting to prevent API abuse"

2. **Frontend Design**:
   - "Built with React 18 using functional components and hooks"
   - "Integrated Monaco Editor for VS Code-like experience"
   - "Implemented dark mode with Context API for global state"

3. **Unique Features**:
   - "AI auto-tagging using OpenAI GPT-3.5 API"
   - "Full-text search across code and descriptions"
   - "One-click code copying for developer productivity"

4. **Deployment**:
   - "Deployed backend on Render with PostgreSQL on Neon"
   - "Frontend hosted on Vercel with automatic deployments"
   - "Configured CORS and environment variables for security"

## 🚀 Live Demo

After deployment, add here:
- **Live App**: https://your-app.vercel.app
- **API Docs**: https://your-api.onrender.com/health
- **GitHub**: https://github.com/YOUR_USERNAME/codesnip

## ⏱️ Time Investment

- **Setup**: 15 minutes
- **Understanding code**: 1-2 hours
- **Customization**: 2-4 hours
- **Deployment**: 30 minutes
- **Total**: ~1 day of focused work

Perfect timing for your job application deadline!

## 🙋 Need Help?

Common commands:
```bash
# Start development
cd backend && npm run dev    # Terminal 1
cd frontend && npm start      # Terminal 2

# View database
cd backend && npx prisma studio

# Reset database
cd backend && npx prisma migrate reset

# Check logs
# Backend: Check terminal
# Frontend: Check browser console
```

---

**🎉 You're all set! Start coding and good luck with your job application!**

Built by Shrestha Jaiswal for ClanX Application ❤️
