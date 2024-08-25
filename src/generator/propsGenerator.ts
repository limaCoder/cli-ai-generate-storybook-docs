import { promises as fs } from "fs";
import path from "path";

export async function generatePropsFile(componentName: string): Promise<void> {
  const propsContent = `
    export const ${componentName.toLowerCase()}PropsInfo = { // Exemplo de estrutura de propriedades, adicione as propriedades reais aqui 
      exampleProp: { 
        description: "Descrição da propriedade exemplo.", 
        table: { 
          type: { 
            summary: "string" 
          }, 
          defaultValue: { 
            summary: "valor padrão" 
          }, 
          category: "Opcional", 
          control: "text", 
        }, 
      }, 
    }; `;

  const propsPath = path.join(
    "src",
    "stories",
    "components",
    "templates",
    `${componentName}Stories`,
    `${componentName}.props.ts`
  );

  try {
    await fs.mkdir(path.dirname(propsPath), { recursive: true });
    await fs.writeFile(propsPath, propsContent, "utf-8");
    console.log(`Arquivo de propriedades gerado em: ${propsPath}`);
  } catch (error: any) {
    throw new Error(
      `Erro ao gerar o arquivo de propriedades: ${error.message}`
    );
  }
}
