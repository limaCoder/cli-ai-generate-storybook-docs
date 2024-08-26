enum ApiKeyNamesEnum {
  "OPENAI_API_KEY" = "OPENAI_API_KEY",
}

const ApiKeyNames = {
  [ApiKeyNamesEnum.OPENAI_API_KEY]:
    "@cli-ai-generate-storybook-docs/openai-api-key",
} as const;

export { ApiKeyNamesEnum, ApiKeyNames };
