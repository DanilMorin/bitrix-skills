import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.argv[2] || process.cwd();

const ignoreDirs = new Set(['node_modules', 'dist', 'build', '.git', 'vendor']); //файлы где нет смысла искать инлайн стили 
const allowedExtensions = new Set(['.html', '.php', '.js', '.jsx', '.ts', '.tsx']); //файлы в которых могут быть инлайн стили

async function walkDir(dir){
    const result = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for(const entry of entries){ //обрабатываем каждый файл и папку в директории
        const fullPath = path.join(dir, entry.name); //полный путь к файлу или папке
        if(entry.isDirectory()){
            if(!ignoreDirs.has(entry.name)){ //если папка не в списке игнорируемых, рекурсивно обходим её
                result.push(...await walkDir(fullPath)); //разворачиваем результат рекурсивного обхода и добавляем его к общему результату
            }
            continue;
        }
        const ext = path.extname(entry.name); //получаем расширение файла
        if(allowedExtensions.has(ext)){ //если расширение файла в списке разрешенных, добавляем его в результат
            result.push(fullPath);
        }
    }
    return result; // возвращаем массив с полными путями к файлам, которые нужно проверить на наличие инлайн стилей
}

function getLineNumber(content, index) {
  return content.slice(0, index).split('\n').length;
}

// Читаем содержимое файла
async function scanFile(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const matches = [];
  const regex = /\sstyle\s*=\s*["'][^"']*["']/gi;

  let match;

  while ((match = regex.exec(content)) !== null) {
    matches.push({
      file: filePath,
      line: getLineNumber(content, match.index),
      value: match[0].trim(),
    });
  }
  return matches;
}

async function main() {
    const files = await walkDir(rootDir);
    const problems = [];

    for(const file of files){
        const fileProblems = await scanFile(file);
        problems.push(...fileProblems); // пушим все найденные проблемы в общий массив
    }
    if(problems.length === 0){
        console.log('Инлайн стили не найдены - No inline styles found ');
    } else {
        problems.forEach(problem => {
            console.log(`File: ${problem.file}, Line: ${problem.line}, Style: ${problem.value}`);
        });
    }
}

main().catch((error) => {
    console.error('Error scanning files:', error);
    process.exit(1);
});