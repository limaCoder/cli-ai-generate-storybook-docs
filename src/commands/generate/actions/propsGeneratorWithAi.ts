import path from "path";
import { promises as fs } from "fs";

import { generateText } from "ai";
import { openaiInstance } from "../../../lib/openai/config.js";
import { Prompt } from "../../../utils/prompt.js";

export async function generatePropsWithAI(
  componentCode: string,
  componentName: string
): Promise<void> {
  const prompt = Prompt.generatePropsPrompt(componentName, componentCode);

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
    console.error(`Erro ao gerar as propriedades com IA: ${error.message}`);
    process.exit(0);
  }
}
