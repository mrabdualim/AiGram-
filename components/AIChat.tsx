import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Sparkles, Loader2, X, Image as ImageIcon, Paperclip, Plus } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, Product } from '../types';
import { PRODUCTS } from '../constants';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, onAddToCart }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      text: 'Привет! Я Zud AI ✨. Загрузите фото вашей комнаты, и я подберу технику, которая идеально впишется в ваш интерьер! Или просто спросите меня о чем угодно.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!inputText.trim() && !selectedImage) || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText || (selectedImage ? "Анализ изображения..." : "")
    };

    setMessages(prev => [...prev, userMsg]);
    
    const imageToSend = selectedImage;
    const textToSend = inputText;

    setInputText('');
    setSelectedImage(null);
    setIsLoading(true);

    const { text, productIds } = await sendMessageToGemini(textToSend, imageToSend || undefined);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: text,
      productIds: productIds
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getRecommendedProducts = (ids?: string[]) => {
    if (!ids || ids.length === 0) return [];
    return PRODUCTS.filter(p => ids.includes(p.id));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile focus */}
      <div className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />
      
      <div className="fixed bottom-[90px] md:bottom-24 right-0 left-0 mx-4 md:left-auto md:right-8 z-50 md:w-[400px] h-[65vh] md:h-[600px] bg-white rounded-[2rem] shadow-2xl shadow-brand-900/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 border border-gray-100">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex items-center justify-between absolute top-0 left-0 right-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 leading-none text-lg">Zud AI</h3>
              <span className="text-xs text-brand-600 font-bold tracking-wide uppercase">Визуальный подбор</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 pt-20 pb-4 space-y-6 bg-gradient-to-b from-gray-50 to-white scrollbar-hide">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex items-end gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 mb-1 shadow-sm">
                     <Bot size={16} className="text-brand-600" />
                  </div>
                )}
                
                <div className={`
                  px-5 py-3.5 text-[15px] leading-relaxed shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-brand-600 text-white rounded-2xl rounded-br-sm' 
                    : 'bg-white text-gray-700 rounded-2xl rounded-bl-sm border border-gray-100'}
                `}>
                  {msg.text}
                </div>
              </div>

              {/* Render Recommended Products */}
              {msg.role === 'model' && msg.productIds && msg.productIds.length > 0 && (
                <div className="pl-11 pr-4 w-full space-y-2">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Рекомендую:</div>
                  {getRecommendedProducts(msg.productIds).map(product => (
                    <div key={product.id} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow group">
                      <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 p-1 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-gray-900 text-sm truncate pr-2">{product.name}</h4>
                          <div className="flex items-center gap-1 text-[10px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full font-bold">
                            <Sparkles size={10} /> {product.rating}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-brand-600 font-bold">{product.price.toLocaleString()} ₽</div>
                          <button 
                            onClick={() => onAddToCart(product)}
                            className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-brand-600 transition-colors shadow-lg shadow-gray-900/10 active:scale-95"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-end gap-3">
               <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 mb-1 shadow-sm">
                  <Bot size={16} className="text-brand-600" />
               </div>
               <div className="bg-white px-5 py-4 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm flex items-center gap-3">
                  <Loader2 size={18} className="animate-spin text-brand-500" />
                  <span className="text-xs font-medium text-gray-500">Zud AI анализирует...</span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 relative">
          {/* Image Preview */}
          {selectedImage && (
            <div className="absolute bottom-full left-4 mb-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-bottom-2 z-10">
              <div className="relative">
                <img src={selectedImage} alt="Preview" className="h-20 w-20 object-cover rounded-lg" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600"
                >
                  <X size={10} />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-end gap-2 bg-gray-50 p-2 rounded-3xl border border-gray-200 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 transition-all">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-gray-400 hover:text-brand-600 hover:bg-white rounded-full transition-all relative group"
              title="Загрузить фото"
            >
              <Paperclip size={20} />
              {/* Pulse indicator if no image selected */}
              {!selectedImage && !inputText && (
                 <span className="absolute top-3 right-3 w-2 h-2 bg-brand-500 rounded-full animate-ping opacity-75"></span>
              )}
            </button>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Опишите или скиньте фото..."
              className="flex-1 bg-transparent border-0 text-gray-900 placeholder:text-gray-400 py-3 max-h-32 resize-none focus:outline-none text-sm"
              rows={1}
            />
            
            <button 
              onClick={handleSend}
              disabled={(!inputText.trim() && !selectedImage) || isLoading}
              className="p-3 bg-brand-600 text-white rounded-full hover:bg-brand-700 disabled:opacity-50 disabled:hover:bg-brand-600 transition-all shadow-md shadow-brand-500/20"
            >
              <Send size={18} className={isLoading ? "opacity-0" : ""} />
              {isLoading && <Loader2 size={18} className="absolute animate-spin" />}
            </button>
          </div>
          
          {/* Helper Hint */}
          {!selectedImage && !inputText && (
            <div className="mt-2 flex justify-center animate-in fade-in slide-in-from-bottom-1 duration-700">
               <p className="text-[10px] text-gray-400 flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                  <ImageIcon size={10} className="text-brand-500" />
                  <span>Совет: Загрузите фото интерьера для лучшего подбора</span>
               </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AIChat;