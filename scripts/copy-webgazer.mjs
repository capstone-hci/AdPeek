import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'node_modules/webgazer/dist/webgazer.js');
const targetDir = resolve(root, 'public/vendor');
const target = resolve(targetDir, 'webgazer.js');

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, target);

console.log('Copied webgazer.js to public/vendor/webgazer.js');
