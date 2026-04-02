import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateInteriorImage(prompt: string) {
  try {
    // If we're in a environment where we might hit quota limits quickly, 
    // or if the API key is missing, we can fallback to picsum.
    if (!process.env.GEMINI_API_KEY) {
      return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/1920/1080`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `High-end architectural photography, interior design, ${prompt}. Modern sleek aesthetic, focus on wood and marble materials, professional lighting, 8k resolution, minimalist luxury.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error: any) {
    console.error("Error generating image:", error);
    // Specifically handle quota exceeded or other API errors
    return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/1920/1080`;
  }
  return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/1920/1080`;
}
