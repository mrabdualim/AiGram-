import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus, Moon } from 'lucide-react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import CheckoutModal from './CheckoutModal';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
  language: Language;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onClearCart, language }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const t = TRANSLATIONS[language];

  // --- Logic synchronized with ProductCard ---
  const isEvening = true; 
  const eveningDiscountPercent = 10;

  // Helper to calculate price for a specific item based on rules
  const getItemPrice = (item: CartItem) => {
    // Discount applies if it's evening AND product is NOT damaged
    if (isEvening && !item.isDamaged) {
      return Math.round(item.price * (1 - eveningDiscountPercent / 100));
    }
    return item.price;
  };

  // 1. Calculate Subtotal (Original Prices)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 2. Calculate Final Total (With Discounts)
  const total = items.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0);

  // 3. Calculate Discount Amount
  const discountAmount = subtotal - total;

  const handleCheckoutSuccess = () => {
    onClearCart();
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
    if (items.length === 0) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-50 transition-opacity duration-500" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border-l border-white/20 dark:border-slate-800">
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.cart}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{items.length} товаров</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
              <div className="w-24 h-24 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center animate-bounce">
                <ShoppingBag size={48} className="text-gray-300 dark:text-gray-600" />
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">{t.emptyCart}</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto">{t.emptyCartDesc}</p>
              </div>
              <button 
                onClick={onClose} 
                className="text-brand-600 dark:text-brand-400 font-bold hover:text-brand-700 flex items-center gap-2"
              >
                {t.toCatalog} <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            items.map(item => {
              const currentPrice = getItemPrice(item);
              const hasDiscount = currentPrice < item.price;

              return (
                <div key={item.id} className="group flex gap-5 animate-in slide-in-from-bottom-2 duration-500">
                  <div className="w-24 h-24 bg-gray-50 dark:bg-slate-800 rounded-2xl p-2 shrink-0 border border-gray-100 dark:border-slate-700 flex items-center justify-center overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                    {hasDiscount && (
                       <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-bl-lg rounded-tr-xl flex items-center gap-0.5">
                         <Moon size={8} /> -10%
                       </div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors p-1 -mr-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                        {item.category}
                        {item.selectedColor && (
                           <span className="flex items-center gap-1 bg-gray-100 dark:bg-slate-700 px-1.5 rounded-full text-[10px] text-gray-600 dark:text-gray-300">
                             <span className="w-2 h-2 rounded-full border border-gray-300" style={{background: item.selectedColor.hex}}></span>
                             {item.selectedColor.name}
                           </span>
                        )}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-col">
                        {hasDiscount && (
                           <span className="text-xs text-gray-400 line-through decoration-red-400/50">
                             {(item.price * item.quantity).toLocaleString()} c.
                           </span>
                        )}
                        <div className={`font-bold text-lg ${hasDiscount ? 'text-indigo-600 dark:text-indigo-400' : 'text-brand-700 dark:text-brand-400'}`}>
                          {(currentPrice * item.quantity).toLocaleString()} c.
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 rounded-xl px-2 py-1">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-gray-500 dark:text-gray-400 hover:text-brand-600 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold w-4 text-center dark:text-white">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-gray-500 dark:text-gray-400 hover:text-brand-600 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="p-6 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                <span>{t.subtotal}</span>
                <span className="line-through">{subtotal.toLocaleString()} c.</span>
              </div>
              <div className="flex justify-between text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                <span className="flex items-center gap-2">
                  <Moon size={14} fill="currentColor" /> {t.discount} (Zud AI)
                </span>
                <span>- {discountAmount.toLocaleString()} c.</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-gray-900 dark:text-white pt-2 border-t border-dashed border-gray-200 dark:border-slate-700 mt-2">
                <span>{t.total}</span>
                <span>{total.toLocaleString()} c.</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-gray-900 dark:bg-brand-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-brand-500 active:scale-[0.98] transition-all shadow-xl shadow-gray-900/20 dark:shadow-brand-900/20 flex items-center justify-center gap-2"
            >
              {t.checkout}
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={handleCloseCheckout}
        totalAmount={total}
        language={language}
        onSuccess={handleCheckoutSuccess}
      />
    </>
  );
};

export default Cart;