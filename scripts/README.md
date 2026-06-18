import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.argv[2] || process.cwd();

async function walk(dir) {
  // 1. Найти все файлы
}

async function scanFile(filePath) {
  // 2. Прочитать файл
  // 3. Найти проблему
}

async function main() {
  // 4. Собрать результаты
  // 5. Вывести отчёт
  // 6. process.exit(0 или 1)
}

main();


