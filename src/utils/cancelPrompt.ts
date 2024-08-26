import { cancel } from "@clack/prompts";

export function cancelPrompt(message = "Operação cancelada") {
  cancel(message);
  process.exit(0);
}
