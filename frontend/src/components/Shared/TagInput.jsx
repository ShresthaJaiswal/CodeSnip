import React, { useState } from 'react';
import { X, Tag } from 'lucide-react';

/**
 * TagInput Component - Input field for adding/removing tags
 * Used in SnippetForm for tag management
 */
const TagInput = ({ tags = [], onChange, placeholder = "Add a tag..." }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = (e) => {
    e.preventDefault();
    const tag = inputValue.trim().toLowerCase();
    
    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag]);
      setInputValue('');
    } else if (tags.includes(tag)) {
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTag(e);
    }
  };

  return (
    <div>
      {/* Input Field */}
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder={placeholder}
          />
        </div>
        <button
          type="button"
          onClick={handleAddTag}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Add
        </button>
      </div>

      {/* Tags Display */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium"
            >
              <Tag className="h-3 w-3" />
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-primary-900 dark:hover:text-primary-200 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Helper Text */}
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Press Enter or click Add to create a tag. Tags help you organize and search snippets.
      </p>
    </div>
  );
};

export default TagInput;
