import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize only if key exists to avoid immediate crash, though usage will fail if missing.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateProductDescription = async (
  name: string,
  category: string,
  keywords: string
): Promise<string> => {
  if (!ai) {
    console.warn("API Key missing");
    return "AI generation unavailable. Please check your API key.";
  }

  try {
    const prompt = `Write a compelling, short e-commerce product description (max 2 sentences) for a shoe named "${name}". 
    Category: ${category}. 
    Key features/vibes: ${keywords}. 
    Tone: Professional, energetic, and premium.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with AI service.";
  }
};
