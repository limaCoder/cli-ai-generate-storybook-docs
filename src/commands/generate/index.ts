import { cancel, intro, isCancel, spinner, text } from "@clack/prompts";
import chalk from "chalk";
import { readComponentFile } from "../../utils/fileReader.js";
import { generateMdxWithAI } from "./actions/mdxGeneratorWithAi.js";
import { generatePropsWithAI } from "./actions/propsGeneratorWithAi.js";
import { cancelPrompt } from "../../utils/cancelPrompt.js";

export async function generateDocs() {
  try {
    intro("Bem vindo ao gerador de documentação Storybook CLI Generate Docs!");

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
      cancelPrompt();
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
}
