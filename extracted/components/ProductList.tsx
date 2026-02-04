import React, { useState, useEffect } from 'react';
import { Product, Language } from '../types';
import { PRODUCTS, TRANSLATIONS } from '../constants';
import ProductCard from './ProductCard';
import { Moon, Flame, Zap } from 'lucide-react';

interface ProductListProps {
  onAddToCart: (product: Product) => void;
  cartItemsIds: string[];
  language: Language;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart, cartItemsIds, language }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Все');
  const [isEvening, setIsEvening] = useState(true); // Forced true for demo
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const checkTime = () => {
      // Logic would go here, but strictly enabled for user request
      setIsEvening(true); 
    };
    checkTime();
  }, []);

  const categories = ['Все', 'Хиты 🔥', 'Новинки 🕒', 'Уценка ⚠️', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  
  const filteredProducts = PRODUCTS.filter(p => {
    if (activeCategory === 'Все') return true;
    if (activeCategory === 'Хиты 🔥') return p.isHit;
    if (activeCategory === 'Новинки 🕒') return p.isNew;
    if (activeCategory === 'Уценка ⚠️') return p.isDamaged;
    return p.category === activeCategory;
  });

  return (
    <section className="py-8 md:py-16 bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* Evening Banner */}
        {isEvening && (
          <div className="mb-10 rounded-[2.5rem] bg-gradient-to-r from-indigo-900 via-violet-800 to-indigo-900 p-8 text-white shadow-2xl shadow-indigo-900/30 relative overflow-hidden animate-in fade-in slide-in-from-top-4">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Moon size={180} />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="bg-white/10 p-4 rounded-full backdrop-blur-md border border-white/20 shadow-inner">
                <Moon size={40} className="text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" fill="currentColor" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <span className="bg-indigo-500/50 backdrop-blur border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-100">Акция</span>
                   <span className="text-indigo-200 text-sm font-medium">18:00 — 06:00</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{t.eveningSaleTitle}</h3>
                <p className="text-indigo-100 text-lg opacity-90 max-w-xl">
                  {t.eveningSaleDesc}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">{t.catalog}</h2>
            <p className="text-gray-500 dark:text-gray-400">Zud AI recommends.</p>
          </div>
          
          {/* Categories */}
          <div className="flex overflow-x-auto pb-4 pt-2 gap-3 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map(cat => {
              const isActive = activeCategory === cat;
              let btnClass = isActive 
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg shadow-gray-900/20 scale-105' 
                : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700';
              
              // Special styling for special categories
              if (cat === 'Уценка ⚠️' && isActive) btnClass = 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105';
              if (cat === 'Хиты 🔥' && isActive) btnClass = 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105';
              if (cat === 'Новинки 🕒' && isActive) btnClass = 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105';

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-6 py-3 rounded-[1.2rem] whitespace-nowrap text-sm font-bold transition-all duration-300 transform active:scale-95
                    ${btnClass}
                  `}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-20">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              isInCart={cartItemsIds.includes(product.id)}
              language={language}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p>Empty Category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;