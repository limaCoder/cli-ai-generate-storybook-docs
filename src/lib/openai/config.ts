import { createOpenAI } from "@ai-sdk/openai";

const openaiInstance = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export { openaiInstance };
