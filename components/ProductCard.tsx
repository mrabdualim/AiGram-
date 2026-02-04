import React, { useState } from 'react';
import { Star, Plus, Check, Heart, Flame, Clock, AlertTriangle, Moon, Info } from 'lucide-react';
import { Product, ProductColor, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
  language: Language;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isInCart, language }) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(product.colors?.[0]);
  const t = TRANSLATIONS[language];

  // --- DEMO MODE: FORCING EVENING TIME TO SHOW THE DESIGN ---
  const isEvening = true; 
  
  // Discount applies if it's evening AND product is NOT damaged/red-price
  const hasEveningDiscount = isEvening && !product.isDamaged;
  const eveningDiscountPercent = 10;
  
  const displayPrice = hasEveningDiscount 
    ? Math.round(product.price * (1 - eveningDiscountPercent / 100)) 
    : product.price;

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-[2.5rem] p-4 pb-5 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-transparent hover:border-gray-100 dark:hover:border-slate-700 flex flex-col h-full overflow-hidden">
      
      {/* --- Top Badges --- */}
      <div className="absolute top-5 left-5 z-20 flex flex-col items-start gap-2">
        {product.isNew && (
          <span className="inline-flex items-center gap-1.5 bg-blue-50/90 dark:bg-blue-900/90 text-blue-600 dark:text-blue-300 text-[10px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md border border-blue-100 dark:border-blue-800 shadow-sm">
            <Clock size={12} strokeWidth={2.5} /> {t.new}
          </span>
        )}
        {product.isHit && (
          <span className="inline-flex items-center gap-1.5 bg-orange-50/90 dark:bg-orange-900/90 text-orange-600 dark:text-orange-300 text-[10px] font-bold px-3 py-1.5 rounded-full border border-orange-100 dark:border-orange-800 shadow-sm">
            <Flame size={12} fill="currentColor" /> {t.hit}
          </span>
        )}
        {product.isDamaged && (
          <span className="inline-flex items-center gap-1.5 bg-red-50/90 dark:bg-red-900/90 text-red-600 dark:text-red-300 text-[10px] font-bold px-3 py-1.5 rounded-full border border-red-100 dark:border-red-800 animate-pulse shadow-sm">
            <AlertTriangle size={12} /> {t.sale}
          </span>
        )}
      </div>

      <button className="absolute top-5 right-5 z-20 w-11 h-11 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:scale-110 transition-all shadow-sm border border-gray-100 dark:border-slate-700">
        <Heart size={22} />
      </button>

      {/* --- Image Section --- */}
      <div className="relative aspect-[1.1] mb-6 rounded-[2rem] bg-gray-50 dark:bg-slate-900 overflow-hidden group-hover:bg-gray-100/50 dark:group-hover:bg-slate-700 transition-colors">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Color overlay hint */}
        {selectedColor && (
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-slate-800/90 backdrop-blur pl-2 pr-3 py-1.5 rounded-full text-[11px] font-semibold text-gray-600 dark:text-gray-300 shadow-md opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 whitespace-nowrap flex items-center gap-2">
             <div className="w-3 h-3 rounded-full border border-gray-200 shadow-sm" style={{background: selectedColor.hex}}></div>
             {selectedColor.name}
           </div>
        )}
      </div>

      {/* --- Product Info --- */}
      <div className="flex-1 flex flex-col">
        {/* Rating & Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase truncate max-w-[60%]">{product.category}</span>
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">
             <Star size={12} className="text-amber-400 fill-amber-400" />
             <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
          </div>
        </div>

        <h3 className="text-[17px] font-bold text-gray-900 dark:text-white leading-snug mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 min-h-[44px]">
          {product.name}
        </h3>

        {/* --- Color Selection --- */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-2 mb-5">
            {product.colors.map((color, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full shadow-sm transition-all duration-300 relative border border-gray-100 dark:border-slate-600
                  ${selectedColor?.name === color.name ? 'scale-125 ring-2 ring-offset-2 ring-gray-200 dark:ring-slate-500 z-10' : 'hover:scale-110 hover:z-10'}
                `}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}

        {/* Damage Reason */}
        {product.isDamaged && product.damageReason && (
          <div className="mb-4 bg-red-50/50 dark:bg-red-900/20 rounded-xl p-3 flex items-start gap-2 border border-red-100 dark:border-red-900/30">
            <Info size={14} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-[10px] text-red-600 dark:text-red-400 leading-snug font-medium opacity-80 line-clamp-2">
              {product.damageReason}
            </p>
          </div>
        )}

        {/* --- Price & Action Block --- */}
        <div className="mt-auto pt-5 border-t border-gray-50 dark:border-slate-700 flex items-end justify-between gap-3">
          <div className="flex flex-col">
            
            {/* EVENING MODE PRICE DISPLAY */}
            {hasEveningDiscount ? (
              <div className="flex flex-col items-start relative">
                 {/* Old Price */}
                 <div className="flex items-center gap-2 mb-0.5">
                   <span className="text-sm text-gray-400 line-through font-semibold decoration-gray-300 dark:decoration-gray-600">
                     {product.price.toLocaleString()} c.
                   </span>
                 </div>
                 
                 {/* New Price Row */}
                 <div className="flex items-center gap-2.5">
                   <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-600 dark:from-indigo-400 dark:to-purple-400 leading-none tracking-tight">
                     {displayPrice.toLocaleString()} c.
                   </div>
                   
                   {/* Prominent Moon Icon Badge */}
                   <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 animate-pulse" title="Вечерняя скидка">
                     <Moon size={16} fill="currentColor" />
                   </div>
                 </div>
                 <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 mt-1 tracking-wide uppercase">{t.eveningPrice}</span>
              </div>
            ) : (
              // STANDARD / DAMAGED PRICE DISPLAY
              <>
                {product.oldPrice && !product.isDamaged && (
                   <span className="text-sm text-gray-400 line-through font-semibold mb-0.5 decoration-gray-300 dark:decoration-gray-600">
                     {product.oldPrice.toLocaleString()} c.
                   </span>
                )}
                <div className={`text-2xl font-extrabold leading-none tracking-tight
                  ${product.isDamaged ? 'text-red-600 dark:text-red-500' : 'text-gray-900 dark:text-white'}
                `}>
                  {displayPrice.toLocaleString()} c.
                </div>
                {product.isDamaged && (
                  <div className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wide mt-1.5 flex items-center gap-1">
                     <AlertTriangle size={10} /> {t.redPrice}
                  </div>
                )}
              </>
            )}

          </div>

          <button 
            onClick={() => onAddToCart({ ...product, selectedColor })}
            disabled={isInCart}
            className={`
              h-12 w-12 rounded-[1.2rem] flex items-center justify-center transition-all duration-300 shadow-lg transform active:scale-95
              ${isInCart 
                ? 'bg-green-500 text-white shadow-green-500/30' 
                : 'bg-gray-900 dark:bg-brand-600 text-white hover:bg-brand-600 dark:hover:bg-brand-500 hover:scale-105 hover:shadow-brand-500/30'
              }
            `}
          >
            {isInCart ? <Check size={24} strokeWidth={3} /> : <Plus size={26} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;