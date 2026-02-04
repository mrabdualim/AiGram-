import React from 'react';
import { Home, Search, PlusSquare, Heart, User, ShoppingBag } from 'lucide-react';

interface InstagramNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  hasNotifications: boolean;
}

const InstagramNav: React.FC<InstagramNavProps> = ({ 
  activeTab, 
  onTabChange, 
  cartCount,
  hasNotifications 
}) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'search', icon: Search, label: 'Поиск' },
    { id: 'add', icon: PlusSquare, label: 'Создать' },
    { id: 'activity', icon: Heart, label: 'Уведомления' },
    { id: 'profile', icon: User, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center flex-1 h-full group"
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon
                  size={28}
                  className={`transition-all ${
                    isActive 
                      ? 'text-gray-900 dark:text-white scale-110' 
                      : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                  fill={isActive && tab.id === 'home' ? 'currentColor' : 'none'}
                />
                
                {/* Notification Badge */}
                {tab.id === 'activity' && hasNotifications && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </div>
            </button>
          );
        })}
        
        {/* Shopping Bag Icon */}
        <button
          onClick={() => onTabChange('cart')}
          className="relative flex flex-col items-center justify-center flex-1 h-full group"
          aria-label="Корзина"
        >
          <div className="relative">
            <ShoppingBag
              size={28}
              className={`transition-all ${
                activeTab === 'cart'
                  ? 'text-gray-900 dark:text-white scale-110'
                  : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
              }`}
              strokeWidth={activeTab === 'cart' ? 2.5 : 2}
            />
            
            {/* Cart Count Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default InstagramNav;
