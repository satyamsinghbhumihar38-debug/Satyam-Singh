
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Creating new instance inside function as per guidelines for latest key selection
export const performOCR = async (base64Image: string, mimeType: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image.split(',')[1], mimeType } },
        { text: "Extract all text from this image exactly as it appears. Keep the formatting as much as possible." }
      ]
    }
  });
  return response.text;
};

export const generateSlides = async (topic: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a professional slide deck content for the topic: "${topic}". 
    Return a JSON array of objects, each with 'title' and 'content' (array of bullet points).
    Create 5-7 slides.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "content"]
        }
      }
    }
  });
  
  return JSON.parse(response.text || '[]');
};

export const enhanceImage = async (base64Image: string, mimeType: string, instruction: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image.split(',')[1], mimeType } },
        { text: instruction || "Enhance the quality of this image, sharpen details and balance colors." }
      ]
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
