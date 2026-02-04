import React, { useState } from 'react';
import { X, Heart, Share2, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
        >
          <X size={24} className="text-gray-900 dark:text-white" />
        </button>

        <div className="grid md:grid-cols-2 gap-0 h-full max-h-[90vh] overflow-y-auto">
          {/* Image Section */}
          <div className="relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain max-h-[500px] rounded-lg"
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
              {product.isHit && (
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  ХИТ
                </span>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col p-6">
            {/* User Info */}
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${product.category}`}
                alt="seller"
                className="w-12 h-12 rounded-full border-2 border-pink-500"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">aigram_official</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
            </div>

            {/* Product Name */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.rating} ({product.comments || 0} отзывов)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {product.oldPrice && (
                <span className="text-gray-400 line-through text-lg mr-2">
                  {product.oldPrice.toLocaleString()} ₽
                </span>
              )}
              <span className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {product.price.toLocaleString()} ₽
              </span>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 mb-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 px-1 font-semibold transition-colors ${
                  activeTab === 'details'
                    ? 'text-pink-500 border-b-2 border-pink-500'
                    : 'text-gray-500'
                }`}
              >
                Описание
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 px-1 font-semibold transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-pink-500 border-b-2 border-pink-500'
                    : 'text-gray-500'
                }`}
              >
                Отзывы
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto mb-4">
              {activeTab === 'details' ? (
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    {product.description}
                  </p>
                  
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Особенности:
                    </h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 text-gray-700 dark:text-gray-300">
                          <span className="text-pink-500">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Mock Reviews */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <img
                          src={`https://api.dicebear.com/7.x/avatars/svg?seed=user${i}`}
                          alt="user"
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">Пользователь {i}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                size={12}
                                className={j < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Отличный товар! Очень доволен покупкой. Рекомендую!
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-3 mt-auto">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                  liked
                    ? 'bg-pink-50 border-pink-500 text-pink-500'
                    : 'border-gray-300 text-gray-600 hover:border-pink-500 hover:text-pink-500'
                }`}
              >
                <Heart size={24} className={liked ? 'fill-current' : ''} />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 text-gray-600 hover:border-pink-500 hover:text-pink-500 transition-colors">
                <Share2 size={24} />
              </button>
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-2">
                  <ShoppingBag size={20} />
                  <span>Добавить в корзину</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
