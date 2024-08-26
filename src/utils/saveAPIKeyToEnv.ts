import chalk from "chalk";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function saveAPIKeyToEnv(
  secretName: string,
  secretKey: string
): Promise<void> {
  try {
    const envPath = path.resolve(__dirname, "../../.env.local");
    fs.writeFileSync(envPath, `${secretName}=${secretKey}\n`);
    console.log(
      chalk.green("A chave da API foi salva com sucesso no arquivo .env.local")
    );
  } catch (error: any) {
    console.error(chalk.red(error.message));
  }
}
