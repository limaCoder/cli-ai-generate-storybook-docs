import path from "path";
import { promises as fs } from "fs";

import { generateText } from "ai";
import { openaiInstance } from "../lib/openai/config.js";

export async function generateMdxWithAI(
  componentCode: string,
  componentName: string
): Promise<void> {
  const prompt = `
    Você é um assistente que ajuda a gerar documentação para componentes de um Storybook. 
    Com base no código abaixo, gere uma documentação MDX para o componente "${componentName}". 
    O template deve incluir seções para Título, Subtítulo, Canvas, Funcionalidades, Sumário, Objetivo, Utilização, e Propriedades. 
    Aqui está o código do componente:

    ${componentCode}
  `;

  try {
    const { text } = await generateText({
      model: openaiInstance("gpt-4o-mini"),
      prompt,
    });

    const mdxContent = text;
    const mdxPath = path.join(
      "src",
      "stories",
      "components",
      "docs",
      `${componentName}.mdx`
    );

    await fs.mkdir(path.dirname(mdxPath), {
      recursive: true,
    });
    await fs.writeFile(mdxPath, mdxContent, "utf-8");

    console.log(`Arquivo MDX gerado em ${mdxPath}`);
  } catch (error: any) {
    throw new Error(`Erro ao gerar o conteúdo com IA: ${error.message}`);
  }
}
