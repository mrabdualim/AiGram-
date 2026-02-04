import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import AIChat from './components/AIChat';
import Cart from './components/Cart';
import BottomNav from './components/BottomNav';
import Stories from './components/Stories';
import { Product, CartItem, Language, Story } from './types';
import { Bot } from 'lucide-react';
import { STORIES } from './constants';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [stories, setStories] = useState<Story[]>(STORIES);
  
  // State for Language and Theme
  const [language, setLanguage] = useState<Language>('tj');
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300 pb-20 md:pb-0">
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

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 py-12 mb-16 md:mb-0 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-900 dark:text-white font-bold text-xl mb-4">Мир Техники</p>
          <div className="flex justify-center gap-6 mb-8 text-gray-500 dark:text-gray-400 flex-wrap">
            <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400">О нас</a>
            <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400">Доставка</a>
            <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400">Гарантия</a>
            <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400">Контакты</a>
          </div>
          <p className="text-gray-400 dark:text-gray-600 text-sm">© 2024 Мир Техники.<br/>Powered by Zud AI.</p>
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
      
      {/* Mobile Bottom Navigation */}
      <BottomNav 
        onOpenAi={() => setIsChatOpen(!isChatOpen)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
      />
    </div>
  );
};

export default App;