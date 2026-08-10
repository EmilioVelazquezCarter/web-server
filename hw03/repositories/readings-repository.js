import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const readingsPath = path.join(__dirname, "../readings.json");

export async function getAll() {
  const data = await readFile(readingsPath, "utf8");
  return JSON.parse(data);


}

export async function save(readings) {
  await writeFile(readingsPath, JSON.stringify(readings, null, 2));
}
