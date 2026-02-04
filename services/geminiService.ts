import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";
import { PRODUCTS } from '../constants';
import { Product } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'demo-key';
const ai = new GoogleGenerativeAI(apiKey);

// Construct a system instruction that includes the product catalog
const systemInstruction = `
Ты - Zud AI, визуальный эксперт и консультант магазина "AiGram".
Твоя супер-сила - подбирать технику под интерьер по фото или описанию.

Вот наш каталог товаров:
${JSON.stringify(PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  price: p.price,
  features: p.features,
  description: p.description,
  category: p.category,
  style_tags: ["современный", "классика", "хай-тек"] 
})))}

ВАЖНОЕ ПРАВИЛО ФОРМАТА:
Твой ответ ВСЕГДА должен быть валидным JSON объектом (без markdown разметки).
Формат ответа:
{
  "text": "Твой дружелюбный ответ и совет здесь...",
  "productIds": ["1", "5"] 
}
* productIds - массив строк с ID товаров, которые ты рекомендуешь (максимум 2-3). Если рекомендаций нет, оставь массив пустым [].

Сценарии:
1. Если пользователь присылает ФОТО:
   - Проанализируй цвета и стиль.
   - Сделай комплимент интерьеру.
   - Подбери 1-2 товара из каталога, которые идеально впишутся.
2. Если фото нет, просто консультируй.
3. Используй эмодзи (✨, 📸, 🏠).
4. Цены пиши в рублях (₽).
`;

let chatSession: ChatSession | null = null;

export const getChatSession = () => {
  if (!chatSession) {
    const model = ai.getGenerativeModel({ 
      model: 'gemini-pro',
    });
    chatSession = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string, imageBase64?: string): Promise<{ text: string, productIds: string[] }> => {
  try {
    const session = getChatSession();
    
    let msgContent: string | any[] = message;

    if (imageBase64) {
      // Clean base64 string if needed (remove data:image/...;base64, prefix)
      const cleanBase64 = imageBase64.split(',')[1] || imageBase64;
      
      msgContent = [
        { text: message || "Проанализируй это изображение и подбери технику под этот стиль." },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: cleanBase64
          }
        }
      ];
    }

    const result = await session.sendMessage(msgContent);
    const response = await result.response;
    const rawText = response.text();

    // Attempt to parse JSON response
    try {
      // Remove any markdown code blocks if the model adds them despite instructions
      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      return {
        text: parsed.text || rawText,
        productIds: Array.isArray(parsed.productIds) ? parsed.productIds : []
      };
    } catch (parseError) {
      console.warn("Could not parse JSON from Gemini, falling back to raw text", rawText);
      return {
        text: rawText,
        productIds: []
      };
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "Мои нейросети перегружены красотой вашего интерьера. Попробуйте позже! (Ошибка сети)",
      productIds: []
    };
  }
};

/**
 * AI-powered product search
 * Intelligently searches products based on natural language queries
 */
export const searchProductsWithAI = async (query: string): Promise<Product[]> => {
  try {
    // Simple keyword matching with AI enhancement
    const lowerQuery = query.toLowerCase();
    
    // Match products based on name, description, features, category
    const results = PRODUCTS.filter(product => {
      const searchText = `${product.name} ${product.description} ${product.features.join(' ')} ${product.category}`.toLowerCase();
      return searchText.includes(lowerQuery);
    });

    // Sort by relevance (simple scoring)
    return results.sort((a, b) => {
      const scoreA = a.name.toLowerCase().includes(lowerQuery) ? 10 : 
                     a.category.toLowerCase().includes(lowerQuery) ? 5 : 1;
      const scoreB = b.name.toLowerCase().includes(lowerQuery) ? 10 : 
                     b.category.toLowerCase().includes(lowerQuery) ? 5 : 1;
      return scoreB - scoreA;
    });
  } catch (error) {
    console.error("AI Search Error:", error);
    return [];
  }
};

/**
 * Get AI-powered product recommendations based on user preferences
 */
export const getPersonalizedRecommendations = (
  viewedProducts: string[],
  cartProducts: string[],
  likedProducts: string[]
): Product[] => {
  // Create a set of all interacted product IDs
  const interactedIds = new Set([...viewedProducts, ...cartProducts, ...likedProducts]);
  
  // Get categories from interacted products
  const interactedCategories = PRODUCTS
    .filter(p => interactedIds.has(p.id))
    .map(p => p.category);
  
  // Find similar products (same category, not already interacted)
  const recommendations = PRODUCTS.filter(product => {
    if (interactedIds.has(product.id)) return false;
    return interactedCategories.includes(product.category);
  });

  // Sort by rating and return top 4
  return recommendations
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);
};

/**
 * Generate AI content for product description
 */
export const generateProductDescription = async (productName: string, features: string[]): Promise<string> => {
  try {
    const prompt = `${systemInstruction}\n\nGenerate a compelling product description for ${productName} with these features: ${features.join(', ')}. Keep it under 100 words and make it engaging.`;
    
    const session = getChatSession();
    const result = await session.sendMessage(prompt);
    const response = await result.response;
    
    return response.text() || "A great product for your needs!";
  } catch (error) {
    console.error("Description generation error:", error);
    return "An amazing product that will enhance your lifestyle.";
  }
};