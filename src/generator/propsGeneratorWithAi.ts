import path from "path";
import { promises as fs } from "fs";

import { generateText } from "ai";
import { openaiInstance } from "../lib/openai/config.js";

export async function generatePropsWithAI(
  componentCode: string,
  componentName: string
): Promise<void> {
  const prompt = `
    Você é um assistente que ajuda a gerar documentação de propriedades para componentes de um Storybook.
    Com base no código abaixo, gere um arquivo de propriedades para o componente "${componentName}" no formato TypeScript.
    Aqui está o código do componente:

    ${componentCode}
  `;

  try {
    const { text } = await generateText({
      model: openaiInstance("gpt-4o-mini"),
      prompt,
    });

    const propsContent = text;

    const propsPath = path.join(
      "src",
      "stories",
      "components",
      "templates",
      `${componentName}Stories`,
      `${componentName}.props.ts`
    );

    await fs.mkdir(path.dirname(propsPath), {
      recursive: true,
    });
    await fs.writeFile(propsPath, propsContent, "utf-8");
    console.log(`Arquivo de propriedades gerado em: ${propsPath}`);
  } catch (error: any) {
    throw new Error(`Erro ao gerar as propriedades com IA: ${error.message}`);
  }
}
