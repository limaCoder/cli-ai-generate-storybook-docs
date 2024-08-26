import chalk from "chalk";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function errorCatcher(error: unknown, errorMessage: string) {
  if (isError(error)) {
    console.error(chalk(`${errorMessage}: ${error.message}`));
    process.exit(0);
  } else {
    console.error(chalk.red("Ocorreu um erro desconhecido"));
  }
}
