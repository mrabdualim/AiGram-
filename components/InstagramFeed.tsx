import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface InstagramFeedProps {
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

interface Post {
  id: string;
  user: {
    username: string;
    avatar: string;
    verified: boolean;
  };
  product: Product;
  caption: string;
  timestamp: Date;
  liked: boolean;
  saved: boolean;
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({ onAddToCart, onProductClick }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState(6);

  useEffect(() => {
    // Transform products into Instagram-style posts
    const instagramPosts: Post[] = PRODUCTS.map((product, index) => ({
      id: product.id,
      user: {
        username: index % 3 === 0 ? 'aigram_official' : index % 3 === 1 ? 'tech_lovers' : 'smart_home_rus',
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${product.category}`,
        verified: index % 3 === 0,
      },
      product,
      caption: product.description,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      liked: product.likes ? product.likes > 100 : false,
      saved: false,
    }));
    setPosts(instagramPosts);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, liked: !post.liked } : post
    ));
  };

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, saved: !post.saved } : post
    ));
  };

  const handleDoubleTap = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, liked: true } : post
    ));
  };

  const loadMore = () => {
    setVisiblePosts(prev => Math.min(prev + 3, posts.length));
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'только что';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} мин назад`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ч назад`;
    return `${Math.floor(seconds / 86400)} дн назад`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      {posts.slice(0, visiblePosts).map((post) => (
        <div key={post.id} className="bg-white dark:bg-gray-800 mb-6 rounded-lg border border-gray-200 dark:border-gray-700">
          {/* Post Header */}
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center space-x-3">
              <img 
                src={post.user.avatar} 
                alt={post.user.username}
                className="w-10 h-10 rounded-full border-2 border-pink-500"
              />
              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold text-sm dark:text-white">{post.user.username}</span>
                  {post.user.verified && (
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                    </svg>
                  )}
                </div>
                <span className="text-xs text-gray-500">{post.product.category}</span>
              </div>
            </div>
            <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900">
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Post Image */}
          <div 
            className="relative cursor-pointer"
            onDoubleClick={() => handleDoubleTap(post.id)}
          >
            <img 
              src={post.product.image} 
              alt={post.product.name}
              className="w-full aspect-square object-cover"
              onClick={() => onProductClick(post.product)}
            />
            
            {/* Price Tag Overlay */}
            <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <div className="flex items-center space-x-2">
                <ShoppingBag size={16} className="text-pink-500" />
                <span className="font-bold text-gray-900 dark:text-white">
                  {post.product.price.toLocaleString()} ₽
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="hover:opacity-70 transition-opacity"
                >
                  <Heart 
                    size={28} 
                    className={post.liked ? 'fill-red-500 text-red-500' : 'text-gray-900 dark:text-white'}
                    strokeWidth={1.5}
                  />
                </button>
                <button className="hover:opacity-70 transition-opacity">
                  <MessageCircle size={28} className="text-gray-900 dark:text-white" strokeWidth={1.5} />
                </button>
                <button className="hover:opacity-70 transition-opacity">
                  <Send size={28} className="text-gray-900 dark:text-white" strokeWidth={1.5} />
                </button>
              </div>
              <button 
                onClick={() => handleSave(post.id)}
                className="hover:opacity-70 transition-opacity"
              >
                <Bookmark 
                  size={28} 
                  className={post.saved ? 'fill-gray-900 dark:fill-white text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* Likes */}
            <div className="font-semibold text-sm dark:text-white mb-2">
              {(post.product.likes || 127) + (post.liked ? 1 : 0)} отметок "Нравится"
            </div>

            {/* Caption */}
            <div className="text-sm dark:text-white mb-1">
              <span className="font-semibold mr-2">{post.user.username}</span>
              <span className="text-gray-900 dark:text-gray-200">{post.caption}</span>
            </div>

            {/* Product Name */}
            <div className="text-sm font-bold text-pink-600 dark:text-pink-400 mb-2">
              #{post.product.name.replace(/\s+/g, '')}
            </div>

            {/* Comments Preview */}
            <button className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Посмотреть все комментарии ({post.product.comments || 24})
            </button>

            {/* Timestamp */}
            <div className="text-xs text-gray-400 uppercase">
              {getTimeAgo(post.timestamp)}
            </div>

            {/* Shop Now Button */}
            <button
              onClick={() => onAddToCart(post.product)}
              className="w-full mt-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-2">
                <ShoppingBag size={20} />
                <span>Купить сейчас</span>
              </div>
            </button>
          </div>
        </div>
      ))}

      {/* Load More */}
      {visiblePosts < posts.length && (
        <button
          onClick={loadMore}
          className="w-full py-4 text-center text-pink-600 dark:text-pink-400 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          Загрузить еще
        </button>
      )}
    </div>
  );
};

export default InstagramFeed;
