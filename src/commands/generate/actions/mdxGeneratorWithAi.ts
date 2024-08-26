import path from "path";
import { promises as fs } from "fs";

import { generateText } from "ai";
import { openaiInstance } from "../../../lib/openai/config.js";
import { Prompt } from "../../../utils/prompt.js";

export async function generateMdxWithAI(
  componentCode: string,
  componentName: string
): Promise<void> {
  const prompt = Prompt.generateMdxPrompt(componentName, componentCode);

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
    console.error(`Erro ao gerar o conteúdo com IA: ${error.message}`);
    process.exit(0);
  }
}
