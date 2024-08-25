import { promises as fs } from "fs";
import path from "path";

export async function generateMdxFile(
  componentName: string,
  componentCode: string
): Promise<void> {
  const mdxContent = `
    import { 
      Canvas, 
      Meta, 
      Controls, 
      Title, 
      Subtitle, 
      Description 
    } from "@storybook/blocks"; 
    import * as ${componentName}Stories from "../${componentName}.stories";

    <style> 
      { 
        .row { 
          display: flex; 
          align-items: center; 
          margin-bottom: 0.50rem; 
        } 

        .item-description { 
          margin-left: 0.50rem; 
        } 
      } 
    </style> 

    <Meta of={${componentName}Stories} /> 
    
    <Title /> 
    <Subtitle>${componentName} padrão.</Subtitle> 
    <Canvas of={${componentName}Stories.Primary} />

    ## Funcionalidades

    <div className="row">
      <strong className="item-description">
        * Flexibilidade para utilização do item;
      </strong>
    </div>

    <div className="row">
      <strong className="item-description">
        * Conformidade com os padrões WAI-ARIA;
      </strong>
    </div>

    <div className="row">
      <strong className="item-description">
        * Customização do ícone utilizado entre os elementos.
      </strong>
    </div>

    ## Sumário

    - [Objetivo](#objetivo)
    - [Utilização](#utilização)
    - [Propriedades](#propriedades)

    ## Objetivo

    O objetivo do componente ${componentName} é x

    ## Utilização

    Para utilizar o componente ${componentName}, importe-o e passe as propriedades necessárias:

    tsx import { ${componentName} } from "@xpto/components";

    const App = () => { return <${componentName} />; };

    ## Propriedades
    Aqui estão as propriedades do componente ${componentName}:

    <Controls />`;

  const mdxPath = path.join(
    "src",
    "stories",
    "components",
    "docs",
    `${componentName}.mdx`
  );

  try {
    await fs.mkdir(path.dirname(mdxPath), {
      recursive: true,
    });
    await fs.writeFile(mdxPath, mdxContent, "utf-8");
    console.log(`Arquivo MDX gerado em: ${mdxPath}`);
  } catch (error: any) {
    throw new Error(`Erro ao gerar o arquivo MDX: ${error.message}`);
  }
}
