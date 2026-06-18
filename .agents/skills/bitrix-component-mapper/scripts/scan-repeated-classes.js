import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.argv[2] || process.cwd();

const ignoredDirs = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  'vendor',
]);

const allowedExtensions = new Set([
  '.html',
  '.htm',
  '.php',
]);

async function walk(dir) {
  const result = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        result.push(...await walk(fullPath));
      }

      continue;
    }

    if (allowedExtensions.has(path.extname(entry.name))) {
      result.push(fullPath);
    }
  }

  return result;
}

function getBlockClass(className) {
  if (!className.includes('__') && !className.includes('--')) {
    return className;
  }

  return className.split('__')[0].split('--')[0];
}

async function scanFile(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const regex = /class\s*=\s*["']([^"']+)["']/gi;
  const found = [];

  let match;

  while ((match = regex.exec(content)) !== null) {
    const classes = match[1].split(/\s+/).filter(Boolean);

    for (const className of classes) {
      const block = getBlockClass(className);

      found.push({
        block,
        className,
        file: filePath,
      });
    }
  }

  return found;
}

async function main() {
  const files = await walk(rootDir);
  const map = new Map();

  for (const file of files) {
    const items = await scanFile(file);

    for (const item of items) {
      if (!map.has(item.block)) {
        map.set(item.block, {
          count: 0,
          files: new Set(),
          classes: new Set(),
        });
      }

      const data = map.get(item.block);
      data.count += 1;
      data.files.add(item.file);
      data.classes.add(item.className);
    }
  }

  const repeated = [...map.entries()]
    .filter(([, data]) => data.count >= 3)
    .sort((a, b) => b[1].count - a[1].count);

  if (repeated.length === 0) {
    console.log('Повторяющиеся блоки не найдены.');
    process.exit(0);
  }

  console.log('Повторяющиеся HTML-блоки:\n');

  for (const [block, data] of repeated) {
    console.log(`Блок: ${block}`);
    console.log(`Количество использований: ${data.count}`);
    console.log(`Файлы:`);
    for (const file of data.files) {
      console.log(`  - ${file}`);
    }
    console.log(`Классы: ${[...data.classes].slice(0, 10).join(', ')}`);
    console.log('');
  }

  process.exit(0);
}

main().catch((error) => {
  console.error('Error scanning files:', error);
  process.exit(1);
});