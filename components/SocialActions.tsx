import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

interface SocialActionsProps {
  productId: string;
  initialLikes?: number;
  initialComments?: number;
  initialShares?: number;
  onLike?: (productId: string, liked: boolean) => void;
  onComment?: (productId: string) => void;
  onShare?: (productId: string) => void;
  onSave?: (productId: string, saved: boolean) => void;
}

const SocialActions: React.FC<SocialActionsProps> = ({
  productId,
  initialLikes = 0,
  initialComments = 0,
  initialShares = 0,
  onLike,
  onComment,
  onShare,
  onSave,
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes(prev => newLiked ? prev + 1 : prev - 1);
    onLike?.(productId, newLiked);
  };

  const handleSave = () => {
    const newSaved = !saved;
    setSaved(newSaved);
    onSave?.(productId, newSaved);
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
      {/* Left side actions */}
      <div className="flex items-center space-x-4">
        {/* Like button */}
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 transition-all duration-200 ${
            liked 
              ? 'text-red-500 scale-110' 
              : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart 
            className={`w-6 h-6 ${liked ? 'fill-current' : ''}`}
          />
          {likes > 0 && (
            <span className="text-sm font-medium">{formatCount(likes)}</span>
          )}
        </button>

        {/* Comment button */}
        <button
          onClick={() => onComment?.(productId)}
          className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
          {initialComments > 0 && (
            <span className="text-sm font-medium">{formatCount(initialComments)}</span>
          )}
        </button>

        {/* Share button */}
        <button
          onClick={() => onShare?.(productId)}
          className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
        >
          <Share2 className="w-6 h-6" />
          {initialShares > 0 && (
            <span className="text-sm font-medium">{formatCount(initialShares)}</span>
          )}
        </button>
      </div>

      {/* Right side - Save button */}
      <button
        onClick={handleSave}
        className={`transition-all duration-200 ${
          saved 
            ? 'text-primary-500 scale-110' 
            : 'text-gray-600 dark:text-gray-400 hover:text-primary-500'
        }`}
      >
        <Bookmark className={`w-6 h-6 ${saved ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
};

export default SocialActions;
