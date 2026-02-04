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
  colors?: ProductColor[];
  // Social media features
  likes?: number;
  shares?: number;
  comments?: number;
  views?: number;
  videoUrl?: string; // TikTok-style video
  // Flags
  isNew?: boolean;        // Новинка (24ч)
  isHit?: boolean;        // Хит продаж
  isDamaged?: boolean;    // Уценка (Красная цена)
  damageReason?: string;  // Причина уценки
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: ProductColor;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
  productIds?: string[];
}

// Social media features
export interface Story {
  id: string;
  title: string;
  image: string;
  videoUrl?: string;
  productIds?: string[];
  viewed?: boolean;
}

export interface Comment {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  timestamp: Date;
  likes: number;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  verified?: boolean;
}