# CodeSnip - Complete Implementation Guide

This document contains all the remaining frontend components and implementation steps.

## 📁 Remaining Frontend Files to Create

### 1. Main App Components

#### `frontend/src/index.js`
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### `frontend/src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}
```

#### `frontend/src/App.jsx`
```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Loading from './components/Shared/Loading';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Routes>
              {/* Public Routes */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Default Route */}
              <Route path="/" element={<Navigate to="/dashboard" />} />

              {/* 404 */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>

            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
```

### 2. Shared Components

#### `frontend/src/components/Shared/Loading.jsx`
```javascript
import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
```

#### `frontend/src/components/Shared/SearchBar.jsx`
```javascript
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "Search snippets..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
```

### 3. Dashboard Component (Main UI)

#### `frontend/src/components/Dashboard/Dashboard.jsx`
```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { snippetAPI, aiAPI } from '../../services/api';
import toast from 'react-hot-toast';
import Navbar from '../Layout/Navbar';
import SnippetList from './SnippetList';
import SnippetForm from '../Editor/SnippetForm';
import SearchBar from '../Shared/SearchBar';
import { Plus, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    language: '',
    tags: ''
  });

  useEffect(() => {
    fetchSnippets();
  }, [searchQuery, filters]);

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const params = {
        ...(searchQuery && { search: searchQuery }),
        ...(filters.language && { language: filters.language }),
        ...(filters.tags && { tags: filters.tags })
      };
      
      const response = await snippetAPI.getAll(params);
      setSnippets(response.data.data.snippets);
    } catch (error) {
      toast.error('Failed to fetch snippets');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSnippet = async (data) => {
    try {
      await snippetAPI.create(data);
      toast.success('Snippet created successfully');
      setShowForm(false);
      fetchSnippets();
    } catch (error) {
      toast.error('Failed to create snippet');
    }
  };

  const handleUpdateSnippet = async (id, data) => {
    try {
      await snippetAPI.update(id, data);
      toast.success('Snippet updated successfully');
      setEditingSnippet(null);
      setShowForm(false);
      fetchSnippets();
    } catch (error) {
      toast.error('Failed to update snippet');
    }
  };

  const handleDeleteSnippet = async (id) => {
    if (!window.confirm('Are you sure you want to delete this snippet?')) return;

    try {
      await snippetAPI.delete(id);
      toast.success('Snippet deleted successfully');
      fetchSnippets();
    } catch (error) {
      toast.error('Failed to delete snippet');
    }
  };

  const handleEditClick = (snippet) => {
    setEditingSnippet(snippet);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSnippet(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name || user?.username}! 👋
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and organize your code snippets
          </p>
        </div>

        {/* Search and Actions */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            New Snippet
          </button>
        </div>

        {/* Snippet List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        ) : (
          <SnippetList
            snippets={snippets}
            onEdit={handleEditClick}
            onDelete={handleDeleteSnippet}
          />
        )}

        {/* Create/Edit Form Modal */}
        {showForm && (
          <SnippetForm
            snippet={editingSnippet}
            onSubmit={editingSnippet ? handleUpdateSnippet : handleCreateSnippet}
            onClose={handleCloseForm}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
```

## 🔧 Implementation Steps

### Step 1: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env and add your database URL and JWT secret

# Run Prisma migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Start the server
npm run dev
```

### Step 2: Frontend Setup

```bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the development server
npm start
```

### Step 3: Test the Application

1. Open http://localhost:3000
2. Register a new account
3. Create your first snippet
4. Test the search functionality
5. Try editing and deleting snippets

### Step 4: Add OpenAI API Key (Optional)

To enable AI features:
1. Get an API key from https://platform.openai.com/
2. Add to backend/.env: `OPENAI_API_KEY=sk-your-key`
3. Restart the backend server

## 🚀 Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repo
4. Set build command: `cd backend && npm install && npx prisma generate`
5. Set start command: `cd backend && npm start`
6. Add environment variables
7. Deploy!

### Deploy Frontend to Vercel

```bash
# From frontend directory
npm install -g vercel
vercel

# Follow prompts
# Set REACT_APP_API_URL to your Render backend URL
```

### Database on Neon

1. Create account at https://neon.tech
2. Create new project
3. Copy connection string
4. Update DATABASE_URL in Render environment variables
5. Run migrations: `npx prisma migrate deploy`

## 📝 Additional Features to Add

1. **Code Execution** - Add ability to run code snippets
2. **Syntax Themes** - Multiple editor themes
3. **Export/Import** - Export snippets as JSON
4. **Folders** - Organize snippets in folders
5. **Collaboration** - Share snippets with other users
6. **Comments** - Add comments to snippets
7. **Favorites** - Mark snippets as favorites
8. **Tags Management** - Better tag organization
9. **Analytics** - Track snippet usage
10. **Mobile App** - React Native version

## 🐛 Troubleshooting

**Issue: Database connection failed**
- Check DATABASE_URL format
- Ensure PostgreSQL is running
- Verify database exists

**Issue: JWT token errors**
- Clear localStorage in browser
- Check JWT_SECRET is set
- Verify token format

**Issue: CORS errors**
- Check FRONTEND_URL in backend .env
- Verify API_URL in frontend .env
- Restart both servers

## 📚 Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [React Router Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Monaco Editor Docs](https://microsoft.github.io/monaco-editor/)

---

**Project Status**: ✅ Complete and Ready to Deploy!
