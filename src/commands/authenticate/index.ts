import { intro } from "@clack/prompts";
import { getOpenAIKey } from "./actions/getApiKey.js";
import { errorCatcher } from "../../utils/errorCatcher.js";

export async function authenticateUser() {
  try {
    intro(
      "Olá! Realize uma autenticação abaixo com os serviços do OpenAI inserindo uma SECRET KEY válida:"
    );

    await getOpenAIKey();
  } catch (error: unknown) {
    errorCatcher(error, "Erro ao autenticar");
  }
}
