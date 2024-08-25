import { Command } from "commander";
import chalk from "chalk";

import { generateMdxWithAI } from "../generator/mdxGeneratorWithAi.js";
import { generatePropsWithAI } from "../generator/propsGeneratorWithAi.js";
import { readComponentFile } from "../utils/fileReader.js";

const program = new Command();

program
  .name("storybook-docs-cli")
  .description(
    "CLI para gerar automaticamente as Docs MDX dos componentes do Storybook."
  )
  .version("0.1.0");

program
  .command("generate")
  .description("Gera as Docs MDX para um componente específico.")
  .argument("<component-path>", "O caminho do componente a ser documentado.")
  .action(async (componentPath) => {
    try {
      const componentCode = await readComponentFile(componentPath);
      const componentName = componentPath.split("/").pop()?.split(".")[0];

      if (componentName) {
        await generateMdxWithAI(componentCode, componentName);
        await generatePropsWithAI(componentCode, componentName);
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
