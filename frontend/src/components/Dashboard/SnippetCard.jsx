import React, { useState } from 'react';
import { Edit2, Trash2, Copy, Check, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

const SnippetCard = ({ snippet, onEdit, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      javascript: 'bg-yellow-500',
      typescript: 'bg-blue-600',
      python: 'bg-blue-500',
      java: 'bg-red-600',
      cpp: 'bg-pink-600',
      csharp: 'bg-purple-600',
      go: 'bg-cyan-500',
      rust: 'bg-orange-600',
      ruby: 'bg-red-500',
      php: 'bg-indigo-600',
      html: 'bg-orange-500',
      css: 'bg-blue-400',
      sql: 'bg-teal-600',
    };
    return colors[language] || 'bg-gray-600';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden group">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 flex-1">
            {snippet.title}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium text-white rounded ${getLanguageColor(snippet.language)}`}>
            {snippet.language}
          </span>
        </div>
        
        {snippet.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {snippet.description}
          </p>
        )}
      </div>

      {/* Code Preview */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900">
        <pre className="text-xs font-mono text-gray-800 dark:text-gray-300 overflow-hidden line-clamp-4">
          <code>{snippet.code}</code>
        </pre>
      </div>

      {/* Card Footer */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {snippet.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
          {snippet.tags.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
              +{snippet.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => onEdit(snippet)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Edit snippet"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(snippet.id)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Delete snippet"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="px-4 pb-3 text-xs text-gray-500 dark:text-gray-400">
        Updated {formatDate(snippet.updatedAt)}
      </div>
    </div>
  );
};

export default SnippetCard;
