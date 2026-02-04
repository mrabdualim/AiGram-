import React from 'react';
import { Heart, Send, Menu } from 'lucide-react';

interface InstagramHeaderProps {
  onMessagesClick: () => void;
  onMenuClick: () => void;
  hasNotifications: boolean;
}

const InstagramHeader: React.FC<InstagramHeaderProps> = ({ 
  onMessagesClick, 
  onMenuClick,
  hasNotifications 
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-gray-900 dark:text-white" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AiGram
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative hover:opacity-70 transition-opacity">
            <Heart size={28} className="text-gray-900 dark:text-white" strokeWidth={2} />
            {hasNotifications && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          <button 
            onClick={onMessagesClick}
            className="hover:opacity-70 transition-opacity"
          >
            <Send size={28} className="text-gray-900 dark:text-white" strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default InstagramHeader;
