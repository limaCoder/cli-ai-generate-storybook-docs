import { Command } from "commander";
import chalk from "chalk";

import { generateMdxWithAI } from "../commands/actions/mdxGeneratorWithAi.js";
import { generatePropsWithAI } from "../commands/actions/propsGeneratorWithAi.js";
import { readComponentFile } from "../utils/fileReader.js";
import { cancel, intro, isCancel, spinner, text } from "@clack/prompts";
import { getOpenAIKey } from "../commands/authenticate/index.js";

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
  .action(async () => {
    try {
      intro(
        "Olá! Realize uma autenticação abaixo com os serviços do OpenAI inserindo uma SECRET KEY válida:"
      );

      await getOpenAIKey();
    } catch (error: any) {
      console.error(chalk.red(error.message));
    }
  });

program
  .command("generate")
  .description("Gera as Docs MDX para um componente específico.")
  .action(async () => {
    try {
      intro(
        "Bem vindo ao gerador de documentação Storybook CLI Generate Docs!"
      );

      if (!process.env.OPENAI_API_KEY) {
        console.log(
          chalk.red(
            `Antes de rodar o comando para gerar as documentações de seus componentes, é necessário primeiro que seja feita uma autenticação com os serviços da OpenAI. Para realizar a autenticação, rode o comando: ${chalk.bgYellow(
              "npm start authenticate"
            )}`
          )
        );

        process.exit(0);
      }

      const componentPath = await text({
        message: "Informe o caminho do componente:",
        placeholder: "Ex: src/components/Button",
        validate(value) {
          if (value.trim() === "")
            return "O caminho do componente não pode estar vazio.";
        },
      });

      if (isCancel(componentPath)) {
        cancel("Operação cancelada.");
        process.exit(0);
      }

      const componentPathSerialized = String(componentPath);

      const componentCode = await readComponentFile(componentPathSerialized);
      const componentName = componentPathSerialized
        .split("/")
        .pop()
        ?.split(".")[0];

      if (componentName) {
        const loading = spinner();

        loading.start("Gerando arquivos...");
        await generateMdxWithAI(componentCode, componentName);
        await generatePropsWithAI(componentCode, componentName);
        loading.stop("Arquivos gerados");

        console.log(
          chalk.green(
            `Documentação gerada com sucesso para o componente: ${componentName}`
          )
        );
      } else {
        console.error(
          chalk.red("Não foi possível determinar o nome do componente.")
        );
      }
    } catch (error: any) {
      console.error(chalk.red(error.message));
    }
  });

program.parse(process.argv);
