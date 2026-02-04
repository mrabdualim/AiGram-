import React from 'react';
import { Home, Grid, Sparkles, ShoppingCart, User } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface BottomNavProps {
  onOpenAi: () => void;
  onOpenCart: () => void;
  cartCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
}

const BottomNav: React.FC<BottomNavProps> = ({ 
  onOpenAi, 
  onOpenCart, 
  cartCount, 
  activeTab, 
  setActiveTab,
  language
}) => {
  const t = TRANSLATIONS[language];

  const scrollToSection = (id: string, tabName: string) => {
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-slate-800 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] md:hidden pb-safe">
      <div className="grid grid-cols-5 h-[72px] items-end pb-2">
        
        {/* Home */}
        <button 
          onClick={() => scrollToSection('top', 'home')}
          className={`flex flex-col items-center justify-center gap-1.5 h-full transition-all duration-300 ${activeTab === 'home' ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
        >
          <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-medium tracking-wide">{t.home}</span>
        </button>

        {/* Catalog */}
        <button 
          onClick={() => scrollToSection('catalog', 'catalog')}
          className={`flex flex-col items-center justify-center gap-1.5 h-full transition-all duration-300 ${activeTab === 'catalog' ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
        >
          <Grid size={24} strokeWidth={activeTab === 'catalog' ? 2.5 : 2} />
          <span className="text-[10px] font-medium tracking-wide">{t.catalog}</span>
        </button>

        {/* Zud AI - Central Floating Button */}
        <div className="relative h-full flex items-center justify-center -mt-6">
          <button 
            onClick={onOpenAi}
            className="absolute -top-6 w-16 h-16 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-xl shadow-brand-500/40 transform transition-transform active:scale-95 flex items-center justify-center ring-8 ring-white/50 dark:ring-slate-900/50 backdrop-blur-sm"
          >
            <Sparkles size={28} className="animate-pulse" strokeWidth={2.5} />
          </button>
          <span className="absolute bottom-2 text-[10px] font-bold text-brand-600 dark:text-brand-400">Zud AI</span>
        </div>

        {/* Cart */}
        <button 
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center gap-1.5 h-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 relative transition-all duration-300"
        >
          <div className="relative">
            <ShoppingCart size={24} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white dark:border-slate-900">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-wide">{t.cart}</span>
        </button>

        {/* Profile */}
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center gap-1.5 h-full transition-all duration-300 ${activeTab === 'profile' ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
        >
          <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span className="text-[10px] font-medium tracking-wide">{t.profile}</span>
        </button>

      </div>
    </div>
  );
};

export default BottomNav;