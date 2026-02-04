export type Language = 'ru' | 'tj';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  features: string[];
  description: string;
  colors?: ProductColor[]; // New: Available colors
  // Flags
  isNew?: boolean;        // Новинка (24ч)
  isHit?: boolean;        // Хит продаж
  isDamaged?: boolean;    // Уценка (Красная цена)
  damageReason?: string;  // Причина уценки
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: ProductColor; // Store selected color in cart
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
  productIds?: string[]; // IDs of products recommended by AI
}