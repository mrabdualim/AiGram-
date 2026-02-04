import React, { useState, useEffect } from 'react';
import { X, Truck, Store, CreditCard, Banknote, ShieldCheck, CheckCircle, Download, Loader2 } from 'lucide-react';
import { TRANSLATIONS, APP_NAME } from '../constants';
import { Language } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  language: Language;
  onSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, totalAmount, language, onSuccess }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [deliveryType, setDeliveryType] = useState<'courier' | 'pickup'>('courier');
  const [paymentType, setPaymentType] = useState<'cash' | 'card' | 'installments'>('cash');
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isAnimating, setIsAnimating] = useState(false);
  const [loadingText, setLoadingText] = useState('Обработка заказа...');

  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setIsAnimating(false);
      setLoadingText(language === 'tj' ? 'Коркарди фармоиш...' : 'Обработка заказа...');
    }
  }, [isOpen, language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnimating(true);
    
    // Simulate Real-time Process
    const steps = language === 'tj' 
      ? ['Тасдиқи маълумот...', 'Бақайдгирии рақамҳои силсилавӣ...', 'Тавлиди талони кафолат...']
      : ['Проверка данных...', 'Регистрация серийных номеров...', 'Генерация талона...'];

    let currentStep = 0;
    
    // Step 1
    setLoadingText(steps[0]);

    // Sequence
    setTimeout(() => {
      currentStep++;
      setLoadingText(steps[1]);
      
      setTimeout(() => {
        currentStep++;
        setLoadingText(steps[2]);
        
        setTimeout(() => {
           // Final Success
           setStep('success');
           setIsAnimating(false);
           onSuccess(); // Clears the cart in App.tsx
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const WarrantyTicket = () => {
    const today = new Date();
    const expiryDate = new Date(today);
    expiryDate.setFullYear(today.getFullYear() + 3);

    return (
      <div className="bg-[#fffdf0] p-6 rounded-xl border-4 border-double border-amber-400 shadow-xl relative overflow-hidden text-gray-900 mx-auto max-w-sm transform transition-all hover:scale-[1.02] animate-in zoom-in slide-in-from-bottom-5 duration-700">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
        
        {/* Seal */}
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-amber-600 flex items-center justify-center rotate-[-15deg] opacity-80 animate-in fade-in duration-1000 delay-300">
          <div className="w-16 h-16 rounded-full border border-amber-600 border-dashed flex items-center justify-center text-[8px] font-bold text-amber-800 text-center leading-tight uppercase">
            Official<br/>Warranty<br/>Seal
          </div>
        </div>

        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-3">
            <ShieldCheck size={48} className="text-amber-600" />
          </div>
          <h3 className="text-xl font-bold font-serif text-amber-900 uppercase tracking-widest border-b-2 border-amber-200 inline-block pb-1 mb-4">
            {t.warrantyTitle}
          </h3>
          
          <div className="space-y-3 text-sm text-left bg-white/50 p-4 rounded-lg border border-amber-100">
             <div className="flex justify-between">
               <span className="text-amber-800/70">{t.warrantyOwner}:</span>
               <span className="font-bold font-mono">{formData.name || 'Client'}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-amber-800/70">{t.warrantyIssued}:</span>
               <span className="font-bold">{APP_NAME}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-amber-800/70">{t.warrantyValid}:</span>
               <span className="font-bold text-green-700">{expiryDate.toLocaleDateString()}</span>
             </div>
             <div className="flex justify-between items-center pt-2 mt-2 border-t border-amber-100">
               <span className="text-amber-800/70">ID:</span>
               <span className="font-mono text-xs">{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
             </div>
          </div>

          <div className="mt-6 text-[10px] text-amber-700/60 uppercase tracking-widest">
            3 Years Full Coverage
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
           <h3 className="font-bold text-lg text-gray-900 dark:text-white">
             {step === 'form' ? t.orderTitle : t.successOrder}
           </h3>
           <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400">
             <X size={20} />
           </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Auto Warranty Badge */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 flex items-center gap-3">
                 <div className="p-2 bg-amber-100 dark:bg-amber-800 rounded-full text-amber-600 dark:text-amber-300">
                   <ShieldCheck size={20} />
                 </div>
                 <div className="flex-1">
                   <div className="text-sm font-bold text-amber-900 dark:text-amber-200">Гарантия 3 года</div>
                   <div className="text-xs text-amber-700 dark:text-amber-400">Талон будет сгенерирован автоматически после заказа.</div>
                 </div>
                 <div className="text-green-600 dark:text-green-400">
                    <CheckCircle size={18} />
                 </div>
              </div>

              {/* Delivery */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{t.deliveryMethod}</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={() => setDeliveryType('courier')}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all
                      ${deliveryType === 'courier' ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400' : 'border-gray-200 dark:border-slate-600 text-gray-500 hover:border-gray-300'}
                    `}
                  >
                    <Truck size={24} />
                    <span className="text-xs font-bold text-center">{t.courier}</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all
                      ${deliveryType === 'pickup' ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400' : 'border-gray-200 dark:border-slate-600 text-gray-500 hover:border-gray-300'}
                    `}
                  >
                    <Store size={24} />
                    <span className="text-xs font-bold text-center">{t.pickup}</span>
                  </button>
                </div>
              </div>

              {/* Payment */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{t.paymentMethod}</label>
                <div className="space-y-2">
                   {[
                     { id: 'cash', icon: Banknote, label: t.cash },
                     { id: 'card', icon: CreditCard, label: t.card },
                     { id: 'installments', icon: CheckCircle, label: t.installments },
                   ].map((method) => (
                     <div 
                       key={method.id}
                       onClick={() => setPaymentType(method.id as any)}
                       className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all
                         ${paymentType === method.id ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 ring-1 ring-brand-500' : 'border-gray-200 dark:border-slate-600 hover:border-gray-300'}
                       `}
                     >
                        <div className={`p-2 rounded-full ${paymentType === method.id ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-500'}`}>
                          <method.icon size={16} />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{method.label}</span>
                     </div>
                   ))}
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                 <div>
                   <label className="block text-xs font-bold text-gray-500 mb-1">{t.nameLabel}</label>
                   <input 
                     required
                     type="text" 
                     value={formData.name}
                     onChange={e => setFormData({...formData, name: e.target.value})}
                     className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl p-3 outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-500 mb-1">{t.phoneLabel}</label>
                   <input 
                     required
                     type="tel" 
                     value={formData.phone}
                     onChange={e => setFormData({...formData, phone: e.target.value})}
                     className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl p-3 outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
                   />
                 </div>
              </div>

              {/* Submit */}
              <button 
                type="submit"
                disabled={isAnimating}
                className="w-full bg-gray-900 dark:bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-brand-500 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isAnimating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={20} className="animate-spin" />
                    <span>{loadingText}</span>
                  </div>
                ) : (
                   <>
                     {t.confirmOrder} • {totalAmount.toLocaleString()} c.
                   </>
                )}
              </button>

            </form>
          ) : (
            <div className="flex flex-col items-center">
               <div className="mb-6 w-full">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 animate-in zoom-in duration-500">
                   <CheckCircle size={32} />
                 </div>
                 <p className="text-center text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto mb-6">
                   Спасибо за заказ! Ваш гарантийный талон готов.
                 </p>
                 
                 <WarrantyTicket />
                 
                 <button className="w-full mt-8 bg-brand-50 text-brand-700 border border-brand-200 py-3 rounded-xl font-bold hover:bg-brand-100 transition-colors flex items-center justify-center gap-2">
                   <Download size={18} />
                   {t.download}
                 </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;