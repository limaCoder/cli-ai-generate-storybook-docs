import { promises as fs } from "fs";
import path from "path";
import { errorCatcher } from "./errorCatcher.js";

export async function readComponentFile(
  componentPath: string
): Promise<string | undefined> {
  let fullPath = path.resolve(componentPath);

  try {
    const stats = await fs.stat(fullPath);

    if (stats.isDirectory()) {
      const files = await fs.readdir(fullPath);
      const componentFile = files.find(
        (file) => file.endsWith("tsx") || file.endsWith(".jsx")
      );

      if (componentFile) {
        fullPath = path.join(fullPath, componentFile);
      } else {
        throw new Error(
          "Nenhum arquivo .tsx ou .jsx encontrado no diretório fornecido."
        );
      }
    }

    const data = await fs.readFile(fullPath, "utf-8");
    return data;
  } catch (error: unknown) {
    errorCatcher(error, "Erro ao ler o arquivo do componente");
  }
}
