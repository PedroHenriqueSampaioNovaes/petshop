import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = fs
  .readdirSync(path.resolve(__dirname))
  .filter((file) => file.indexOf('.') !== 0 && !/index.[ts|js]/.test(file));

export default Promise.all(
  files.map(async (file) => {
    const filePath = path.resolve(__dirname, file);
    const module = await import(pathToFileURL(filePath).href);
    return module.default || module;
  })
);
