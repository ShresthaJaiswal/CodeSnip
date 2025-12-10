import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { snippetAPI } from '../../services/api';
import toast from 'react-hot-toast';
import Navbar from '../Layout/Navbar';
import SnippetList from './SnippetList';
import SnippetForm from '../Editor/SnippetForm';
import SearchBar from '../Shared/SearchBar';
import { Plus, Loader2, Filter } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    fetchSnippets();
  }, [searchQuery, selectedLanguage]);

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedLanguage) params.language = selectedLanguage;
      
      const response = await snippetAPI.getAll(params);
      setSnippets(response.data.data.snippets);
    } catch (error) {
      toast.error('Failed to fetch snippets');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSnippet = async (data) => {
    try {
      await snippetAPI.create(data);
      toast.success('Snippet created successfully!');
      setShowForm(false);
      fetchSnippets();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create snippet');
    }
  };

  const handleUpdateSnippet = async (id, data) => {
    try {
      await snippetAPI.update(id, data);
      toast.success('Snippet updated successfully!');
      setEditingSnippet(null);
      setShowForm(false);
      fetchSnippets();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update snippet');
    }
  };

  const handleDeleteSnippet = async (id) => {
    if (!window.confirm('Are you sure you want to delete this snippet?')) {
      return;
    }

    try {
      await snippetAPI.delete(id);
      toast.success('Snippet deleted successfully!');
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

  const handleNewSnippet = () => {
    setEditingSnippet(null);
    setShowForm(true);
  };

  // Get unique languages from snippets for filter
  const uniqueLanguages = [...new Set(snippets.map(s => s.language))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name || user?.username}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and organize your code snippets with AI-powered features
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Snippets</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {snippets.length}
                </p>
              </div>
              <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg">
                <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Languages</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {uniqueLanguages.length}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {snippets.length > 0 ? 'Today' : 'Never'}
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar 
              onSearch={setSearchQuery} 
              placeholder="Search snippets by title, code, or description..."
            />
          </div>
          
          <div className="flex gap-2">
            {/* Language Filter */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Languages</option>
              {uniqueLanguages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>

            {/* New Snippet Button */}
            <button
              onClick={handleNewSnippet}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-sm hover:shadow-md"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">New Snippet</span>
            </button>
          </div>
        </div>

        {/* Clear Filters */}
        {(searchQuery || selectedLanguage) && (
          <div className="mb-4 flex items-center gap-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Filters active:
            </span>
            {searchQuery && (
              <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded">
                Search: "{searchQuery}"
              </span>
            )}
            {selectedLanguage && (
              <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded">
                Language: {selectedLanguage}
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLanguage('');
              }}
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Snippet List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
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
