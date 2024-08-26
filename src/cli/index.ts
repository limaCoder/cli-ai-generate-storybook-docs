import { Command } from "commander";
import { generateDocs } from "../commands/generate/index.js";
import { authenticateUser } from "../commands/authenticate/index.js";

const program = new Command();

program
  .name("storybook-docs-cli")
  .description(
    "CLI para gerar automaticamente as Docs MDX dos componentes do Storybook."
  )
  .version("0.1.0");

program
  .command("authenticate")
  .description("Realiza uma autenticação com os serviços da OpenAI.")
  .action(authenticateUser);

program
  .command("generate")
  .description("Gera as Docs MDX para um componente específico.")
  .action(generateDocs);

program.parse(process.argv);
