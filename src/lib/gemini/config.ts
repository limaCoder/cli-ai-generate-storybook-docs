import { createGoogleGenerativeAI } from "@ai-sdk/google";

const geminiInstance = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

export { geminiInstance };
