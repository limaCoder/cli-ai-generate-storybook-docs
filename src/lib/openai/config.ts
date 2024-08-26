import { createOpenAI } from "@ai-sdk/openai";
import { globalConfig } from "../../constants/conf.js";
import { ApiKeyNames, ApiKeyNamesEnum } from "../../constants/apiKeyNames.js";

const apiKey = globalConfig.get(ApiKeyNames[ApiKeyNamesEnum.OPENAI_API_KEY]);

const apiKeySerialized = String(apiKey);

const openaiInstance = createOpenAI({
  apiKey: apiKeySerialized,
});

export { openaiInstance };
