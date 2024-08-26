import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { globalConfig } from "../../constants/conf.js";
import { ApiKeyNames, ApiKeyNamesEnum } from "../../constants/apiKeyNames.js";

const apiKey = globalConfig.get(ApiKeyNames[ApiKeyNamesEnum.OPENAI_API_KEY]);

const apiKeySerialized = String(apiKey);

const geminiInstance = createGoogleGenerativeAI({
  apiKey: apiKeySerialized,
});

export { geminiInstance };
