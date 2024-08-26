import { intro } from "@clack/prompts";
import { getOpenAIKey } from "./actions/getApiKey.js";
import chalk from "chalk";

export async function authenticateUser() {
  try {
    intro(
      "Olá! Realize uma autenticação abaixo com os serviços do OpenAI inserindo uma SECRET KEY válida:"
    );

    await getOpenAIKey();
  } catch (error: any) {
    console.error(chalk.red(error.message));
  }
}
