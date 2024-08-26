# AI Generate Storybook Docs CLI

AI Generate Storybook Docs CLI é uma ferramenta poderosa para gerar automaticamente documentação MDX para seus componentes do Storybook, utilizando a OpenAI para criar documentação baseada no código dos componentes.

## Funcionalidades

- **Autenticação via OpenAI**: Autentique-se com a OpenAI para utilizar as funcionalidades de geração de documentação.
- **Geração Automática de Documentação**: Gera automaticamente arquivos MDX e de propriedades TypeScript para seus componentes Storybook, utilizando inteligência artificial para interpretar o código e criar documentação detalhada.
- **Experiência de Usuário Interativa**: Interface de linha de comando interativa para facilitar a geração de documentação.

## Instalação

Você pode instalar a CLI via npm:

```bash
npm install -g ai-generate-storybook-docs-cli
```

## Uso

### Autenticação

Antes de gerar a documentação, você precisa se autenticar com a OpenAI:

```bash
ai-generate-storybook-docs-cli authenticate
```

Será solicitado que você insira sua OpenAI API Key. A chave será validada e salva localmente para uso futuro.

### Gerar Documentação

Após a autenticação, você pode gerar a documentação MDX para um componente específico:

```bash
ai-generate-storybook-docs-cli generate
```

O comando solicitará que você forneça o caminho para o componente que deseja documentar. Em seguida, a documentação MDX será gerada automaticamente.

## Estrutura do Projeto

O projeto é modularizado, com comandos e funcionalidades separadas em diferentes módulos:

- `src/cli/index.ts`: Arquivo principal da CLI, definindo os comandos disponíveis.
- `src/commands/generate/`: Lógica para geração de documentação MDX e arquivos de propriedades.
- `src/commands/authenticate/`: Lógica para autenticação com a OpenAI.
- `src/utils/`: Funções auxiliares para leitura de arquivos, salvamento de chave API, etc.
- `src/lib/openai/`: Configuração da instância da OpenAI.

## Desenvolvimento

Para contribuir com o desenvolvimento desta CLI, siga os passos abaixo:

### Pré-requisitos

- Node.js v20+
- npm ou yarn

### Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/limaCoder/cli-ai-generate-storybook-docs.git
cd cli-ai-generate-storybook-docs
npm install
```

### Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests no GitHub.

1. Fork o projeto
2. Crie uma nova branch (`git checkout -b feature/nome-da-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
