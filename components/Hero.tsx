import React from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface HeroProps {
  onOpenAi: () => void;
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ onOpenAi, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="relative bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      
      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 md:order-1">
            
            <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 px-4 py-1.5 rounded-full text-xs font-semibold text-brand-700 dark:text-brand-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              Zud AI 2.0
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-gray-900 dark:text-white">
              {t.heroTitle1} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
                {t.heroTitle2}
              </span>
            </h1>
            
            <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg">
              {t.heroDesc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onOpenAi}
                className="flex items-center justify-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl shadow-gray-900/20 transition-all hover:-translate-y-1"
              >
                <Sparkles size={18} className="text-amber-400 dark:text-amber-500" />
                {t.askAi}
              </button>
              <button className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-semibold transition-all">
                {t.catalog}
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                        <img key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" src={`https://picsum.photos/100/100?random=${i+20}`} alt="User" />
                    ))}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-bold text-gray-900 dark:text-white">1000+</span> {t.happyClients} <br/>
                </div>
            </div>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-100 to-indigo-50 dark:from-brand-900/20 dark:to-indigo-900/20 rounded-full blur-3xl opacity-60"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-900/10 border-4 border-white dark:border-slate-800">
                <img 
                src="https://picsum.photos/800/800?random=15" 
                alt="Smart Home" 
                className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 dark:border-slate-700 shadow-lg flex items-center gap-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400">
                        <Check size={20} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{t.optimalChoice}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t.pickedByAi}</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;