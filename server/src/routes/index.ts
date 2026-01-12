import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('dirname', __dirname, path.resolve(__dirname));
// console.log(fs.readdirSync(__dirname));

const files = fs
  .readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && !/index.[ts|js]/.test(file));
console.log(files);

export default Promise.all(
  files.map(async (file) => {
    const filePath = path.resolve(__dirname, file);
    const module = await import(pathToFileURL(filePath).href);
    return module.default || module;
  })
);
