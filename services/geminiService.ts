import { GoogleGenAI, Chat } from "@google/genai";
import { PRODUCTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Construct a system instruction that includes the product catalog
const systemInstruction = `
Ты - Zud AI, визуальный эксперт и консультант магазина "Мир Техники".
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

let chatSession: Chat | null = null;

export const getChatSession = () => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview', 
      config: {
        systemInstruction,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string, imageBase64?: string): Promise<{ text: string, productIds: string[] }> => {
  try {
    const session = getChatSession();
    
    let msgContent: any = message;

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

    const result = await session.sendMessage({ message: msgContent });
    const rawText = result.text || "";

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