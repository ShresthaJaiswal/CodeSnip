import React from 'react';
import { Home, Code2, Settings, TrendingUp, Star } from 'lucide-react';

/**
 * Sidebar Component - Navigation sidebar (optional, for future use)
 * You can integrate this into Dashboard if you want side navigation
 */
const Sidebar = ({ activeTab = 'snippets', onTabChange }) => {
  const menuItems = [
    { id: 'snippets', icon: Code2, label: 'My Snippets' },
    { id: 'favorites', icon: Star, label: 'Favorites' },
    { id: 'trending', icon: TrendingUp, label: 'Trending' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full">
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Navigation
        </h2>
        
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
