import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const embedModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
export const chatModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function getEmbedding(text: string): Promise<number[]> {
  const result = await embedModel.embedContent({
    content: { parts: [{ text }] }
  });
  return result.embedding!.values!;
}
