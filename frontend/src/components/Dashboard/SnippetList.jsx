import React from 'react';
import SnippetCard from './SnippetCard';

const SnippetList = ({ snippets, onEdit, onDelete }) => {
  if (snippets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No snippets yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Create your first code snippet to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {snippets.map((snippet) => (
        <SnippetCard
          key={snippet.id}
          snippet={snippet}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default SnippetList;
