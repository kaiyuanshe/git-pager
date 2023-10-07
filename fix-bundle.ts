import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const [root = 'dist'] = process.argv.slice(2);

console.time();

for (const name of readdirSync(root))
  if (name.endsWith('.js')) {
    const path = join(root, name);
    const data = readFileSync(path, { encoding: 'utf-8' });

    writeFileSync(path, data.replace(/\$\w+\$import\$\w+\W/, ''));

    console.log(`[fix] ${path}`);
  }

console.timeEnd();
