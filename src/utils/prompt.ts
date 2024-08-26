import { removeBackticksFromAnswer } from "./prompt-instructions.js";

export class Prompt {
  static generateMdxPrompt(
    componentName: string,
    componentCode: string | undefined
  ): string {
    const styleBlock = `
      <style>
        { \`
        .row {
          display: flex;
          align-items: center;
          margin-bottom: 0.50rem;
        }
        .item-description {
          margin-left: 0.50rem;
        }
        \` }
      </style>
    `;

    const codeBlock = `\`\`\`tsx
      ${componentCode}
      \`\`\``;

    return `
      import {
        Canvas,
        Meta,
        Controls,
        Title,
        Subtitle,
        Description,
      } from "@storybook/blocks";
      import * as ${componentName}Stories from "../${componentName}.stories";

      ${styleBlock}

      <Meta of={${componentName}Stories} />

      <Title />
      <Subtitle>Subtítulo detalhado que descreve o propósito e as funcionalidades principais do componente. Geração baseada no código lido.</Subtitle>

      <Canvas of={${componentName}Stories.Primary} />

      ## Funcionalidades

      <div className="row">
        <strong className="item-description">
          * Liste as funcionalidades principais do componente ${componentName} dinamicamente, separando cada funcionalidade em uma nova linha e em uma nova div com a classe "row".
        </strong>
      </div>

      ## Sumário

      - [Objetivo](#objetivo)
      - [Utilização](#utilização)
      - [Propriedades](#propriedades)

      ## Objetivo

      Descrição detalhada do objetivo do componente, explicando suas principais características e casos de uso mais comuns. Geração baseada no código lido.

      ## Utilização

      Para utilizar o componente ${componentName}, importe-o e passe as propriedades necessárias. Forneça um exemplo de uso realista com as principais propriedades, como \`label\`, \`primary\`, \`size\`, e outras:

      ${codeBlock}

      ## Propriedades

      Aqui estão as propriedades do componente \`${componentName}\`:

      <Controls />

      Aqui está o código do componente para análise, mas **não inclua este código no MDX gerado** e **não adicione o bloco \`mdx\` ao redor do código gerado, o código gerado deve começar a partir dos imports.**:

      ${codeBlock}

      Gere exclusivamente o código MDX conforme especificado no padrão acima. **Não adicione comentários, resumos, ou qualquer texto adicional.** Apenas o código solicitado deve ser retornado. Os conteúdos das seções devem ser geradas dinamicamente com base no código lido, como as seções de subtítulo, de objetivo e na utilização do componente também. Preencha o conteúdo de texto dessas seções, não é para manter o texto que está aqui na instrução do prompt, e sim para preencher com base no código lido. A seção de funcionalidades deve ser gerada dinamicamente com base no código do componente lido, e cada funcionalidade deve ser separada em uma nova linha dentro de uma div com a classe "row". Não inclua o código do componente no MDX final. ${removeBackticksFromAnswer}.
    `;
  }

  static generatePropsPrompt(
    componentName: string,
    componentCode: string | undefined
  ): string {
    return `
      Gere o arquivo de propriedades para o componente "${componentName}" no formato TypeScript, seguindo exatamente o formato abaixo e sem adicionar comentários adicionais ou resumos ${removeBackticksFromAnswer}:

      export const ${componentName.toLowerCase()}PropsInfo = {
        backgroundColor: {
          description: "Cor de background.",
          table: {
            type: { summary: "string" },
            defaultValue: { summary: "#fff" },
            category: "Opcional",
            control: "color",
          },
        },
        primary: {
          description: "Se é o botão primário ou não.",
          table: {
            type: { summary: "boolean" },
            defaultValue: { summary: "true" },
            category: "Opcional",
            control: "boolean",
          },
        },
        label: {
          description: "Label presente no botão",
          table: {
            type: { summary: "string" },
            defaultValue: { summary: "Button" },
            category: "Opcional",
            control: "string",
          },
        },
      };

      Aqui está o código do componente:

      ${componentCode}
    `;
  }
}
