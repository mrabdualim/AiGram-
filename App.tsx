import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import AIChat from './components/AIChat';
import Cart from './components/Cart';
import BottomNav from './components/BottomNav';
import Stories from './components/Stories';
import InstagramFeed from './components/InstagramFeed';
import InstagramNav from './components/InstagramNav';
import InstagramHeader from './components/InstagramHeader';
import ProductDetailModal from './components/ProductDetailModal';
import { Product, CartItem, Language, Story } from './types';
import { Bot } from 'lucide-react';
import { STORIES } from './constants';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [stories, setStories] = useState<Story[]>(STORIES);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'instagram' | 'classic'>('instagram');
  
  // State for Language and Theme
  const [language, setLanguage] = useState<Language>('ru');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleStoryClick = (story: Story) => {
    // Mark story as viewed
    setStories(prev => prev.map(s => 
      s.id === story.id ? { ...s, viewed: true } : s
    ));
    // You could open a modal or navigate to story view here
    console.log('Story clicked:', story);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'cart') {
      setIsCartOpen(true);
    } else if (tab === 'activity') {
      setIsChatOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300 pb-20 md:pb-0">
      {viewMode === 'instagram' ? (
        <>
          {/* Instagram-style Header */}
          <InstagramHeader 
            onMessagesClick={() => setIsChatOpen(true)}
            onMenuClick={() => setViewMode('classic')}
            hasNotifications={false}
          />
          
          <main className="flex-1 pb-20">
            {/* Stories Section */}
            <div className="container mx-auto px-4 mt-4">
              <Stories stories={stories} onStoryClick={handleStoryClick} />
            </div>
            
            {/* Instagram Feed */}
            {activeTab === 'home' && (
              <div className="container mx-auto px-4 mt-6">
                <InstagramFeed 
                  onAddToCart={handleAddToCart}
                  onProductClick={handleProductClick}
                />
              </div>
            )}

            {/* Search/Explore Tab */}
            {activeTab === 'search' && (
              <div className="container mx-auto px-4 mt-6">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Поиск товаров</h2>
                <ProductList 
                  onAddToCart={handleAddToCart}
                  cartItemsIds={cartItems.map(i => i.id)}
                  language={language}
                />
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="container mx-auto px-4 mt-6">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src="https://api.dicebear.com/7.x/avatars/svg?seed=aigram"
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-pink-500"
                    />
                    <div>
                      <h2 className="text-2xl font-bold dark:text-white">aigram_official</h2>
                      <p className="text-gray-500">AiGram Marketplace</p>
                      <div className="flex space-x-6 mt-2">
                        <div className="text-center">
                          <div className="font-bold dark:text-white">248</div>
                          <div className="text-sm text-gray-500">товаров</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold dark:text-white">12.5K</div>
                          <div className="text-sm text-gray-500">подписчиков</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold dark:text-white">342</div>
                          <div className="text-sm text-gray-500">подписок</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    🛍️ Социальный маркетплейс с AI<br/>
                    🤖 Умный помощник Zud AI<br/>
                    ✨ Instagram стиль покупок
                  </p>
                </div>
              </div>
            )}
          </main>

          {/* Instagram-style Navigation */}
          <InstagramNav 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            hasNotifications={false}
          />
        </>
      ) : (
        <>
          {/* Classic View */}
          <Header 
            cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
            onCartClick={() => setIsCartOpen(true)}
            language={language}
            setLanguage={setLanguage}
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
          
          <main className="flex-1">
            <div id="home">
              <Hero 
                onOpenAi={() => setIsChatOpen(true)} 
                language={language}
              />
            </div>
            
            {/* Stories Section */}
            <div className="container mx-auto px-4 mt-6">
              <Stories stories={stories} onStoryClick={handleStoryClick} />
            </div>
            
            <div id="catalog">
              <ProductList 
                onAddToCart={handleAddToCart}
                cartItemsIds={cartItems.map(i => i.id)}
                language={language}
              />
            </div>
          </main>

          {/* Classic Bottom Navigation */}
          <BottomNav 
            onOpenAi={() => setIsChatOpen(!isChatOpen)}
            onOpenCart={() => setIsCartOpen(!isCartOpen)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            language={language}
          />
        </>
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 py-12 mb-16 md:mb-0 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-tr from-primary-600 to-primary-400 p-2 rounded-xl text-white shadow-lg">
              <Bot size={24} />
            </div>
            <p className="text-gray-900 dark:text-white font-bold text-2xl">AiGram</p>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            AI-powered social marketplace combining Instagram, TikTok, and smart shopping
          </p>
          <div className="flex justify-center gap-6 mb-8 text-gray-500 dark:text-gray-400 flex-wrap">
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About</a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Shop</a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">AI Features</a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</a>
          </div>
          <p className="text-gray-400 dark:text-gray-600 text-sm">
            © 2024 AiGram - Next Generation Marketplace<br/>
            Powered by Zud AI ✨
          </p>
        </div>
      </footer>

      {/* Desktop Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="hidden md:flex fixed bottom-8 right-8 bg-brand-600 text-white p-4 rounded-full shadow-lg shadow-brand-600/30 hover:bg-brand-700 hover:-translate-y-1 transition-all z-40 items-center gap-2 group"
        >
          <Bot size={28} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-medium whitespace-nowrap">
            Zud AI Помощник
          </span>
        </button>
      )}

      {/* Overlays */}
      <AIChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        onAddToCart={handleAddToCart}
      />
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        language={language}
      />
      
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default App;