import { text, isCancel, spinner } from "@clack/prompts";
import chalk from "chalk";

import { validateOpenAIKey } from "../../../helpers/validateApiKey.js";
import { cancelPrompt } from "../../../utils/cancelPrompt.js";
import { globalConfig } from "../../../constants/conf.js";
import {
  ApiKeyNames,
  ApiKeyNamesEnum,
} from "../../../constants/apiKeyNames.js";

export async function getOpenAIKey(): Promise<string | null> {
  const secretKeyName = ApiKeyNames[ApiKeyNamesEnum.OPENAI_API_KEY];

  const apiKey = await text({
    message: "Por favor, insira sua OpenAI API Key:",
    validate(value) {
      if (value.trim() === "") return "A chave não pode estar vazia.";
    },
  });

  if (isCancel(apiKey)) {
    cancelPrompt();
  }

  const apiKeySerialized = String(apiKey);

  const loading = spinner();

  loading.start("Verificando se a chave fornecida é válida...");
  const isValid = await validateOpenAIKey(apiKeySerialized);
  loading.stop("Verificação concluída!");

  if (!isValid) {
    console.error(
      chalk.red("A chave fornecida é inválida. Por favor, tente novamente.")
    );
    process.exit(0);
  }

  globalConfig.set(secretKeyName, apiKeySerialized);
  console.log(chalk.green("Chave da API salva com sucesso!"));

  return apiKeySerialized;
}
