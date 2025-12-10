import React from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../../context/ThemeContext';

/**
 * CodeEditor Component - A wrapper around Monaco Editor
 * Used for displaying code snippets in read-only mode
 */
const CodeEditor = ({ 
  code, 
  language = 'javascript', 
  height = '400px',
  readOnly = true,
  onChange = null,
  showLineNumbers = true 
}) => {
  const { isDark } = useTheme();

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <Editor
        height={height}
        language={language}
        value={code}
        onChange={onChange}
        theme={isDark ? 'vs-dark' : 'light'}
        options={{
          readOnly: readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: showLineNumbers ? 'on' : 'off',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          wrappingIndent: 'indent',
          padding: { top: 10, bottom: 10 },
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
        }}
      />
    </div>
  );
};

export default CodeEditor;
