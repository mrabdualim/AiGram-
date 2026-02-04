import React from 'react';
import { Story } from '../types';
import { Play, Eye } from 'lucide-react';

interface StoriesProps {
  stories: Story[];
  onStoryClick: (story: Story) => void;
}

const Stories: React.FC<StoriesProps> = ({ stories, onStoryClick }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
        Stories & Deals
      </h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide pb-2">
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => onStoryClick(story)}
            className="flex-shrink-0 relative group"
          >
            {/* Story Circle */}
            <div className={`relative rounded-full p-1 ${
              story.viewed 
                ? 'bg-gray-300 dark:bg-gray-600' 
                : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'
            }`}>
              <div className="bg-white dark:bg-gray-800 rounded-full p-1">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  {story.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <Play className="w-6 h-6 text-white" fill="white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Story Title */}
            <p className="text-xs text-center mt-2 max-w-[70px] truncate text-gray-700 dark:text-gray-300">
              {story.title}
            </p>
            
            {/* View indicator */}
            {story.viewed && (
              <div className="absolute top-0 right-0 bg-gray-600 rounded-full p-1">
                <Eye className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Stories;
