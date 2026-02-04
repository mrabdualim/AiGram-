import React from 'react';
import { ShoppingCart, Search, Zap, User, Sun, Moon, Globe } from 'lucide-react';
import { APP_NAME, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, language, setLanguage, isDark, toggleTheme }) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="bg-gradient-to-tr from-brand-600 to-brand-400 p-2 rounded-xl text-white shadow-lg shadow-brand-500/20 transform group-hover:rotate-12 transition-transform duration-300">
            <Zap size={20} fill="currentColor" />
          </div>
          <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            {APP_NAME}
          </span>
        </div>

        {/* Desktop Nav - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
          <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800 px-3 py-2 rounded-lg transition-all">{t.catalog}</a>
          <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800 px-3 py-2 rounded-lg transition-all">{t.promo}</a>
          <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800 px-3 py-2 rounded-lg transition-all">Zud AI</a>
          <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800 px-3 py-2 rounded-lg transition-all">{t.stores}</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Controls */}
          <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-lg p-1 mr-2">
             <button 
               onClick={toggleTheme}
               className="p-1.5 rounded-md text-gray-500 dark:text-yellow-400 hover:bg-white dark:hover:bg-slate-700 transition-all"
             >
               {isDark ? <Moon size={16} /> : <Sun size={16} />}
             </button>
             <div className="w-px h-4 bg-gray-300 dark:bg-slate-700 mx-1"></div>
             <button 
               onClick={() => setLanguage(language === 'ru' ? 'tj' : 'ru')}
               className="px-2 py-0.5 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-700 rounded-md uppercase transition-all flex items-center gap-1"
             >
               {language}
             </button>
          </div>

          <button className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <Search size={20} />
          </button>
          
          <button 
            onClick={onCartClick}
            className="hidden md:flex relative p-2.5 text-gray-700 dark:text-gray-200 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-800 rounded-xl transition-all group"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
            )}
          </button>

          <button className="hidden md:flex p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl">
             <User size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;