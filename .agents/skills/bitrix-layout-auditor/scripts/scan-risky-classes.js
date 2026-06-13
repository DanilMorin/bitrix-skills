import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.argv[2] || process.cwd();

const ignoredDirs = new Set([
    'node_modules',
    '.git',
    'dist',
    'build',
    '.next',
    '.nuxt',
    'vendor',
]);

const allowedExtensions = new Set([
    '.html',
    '.htm',
    '.php',
    '.scss',
    '.css',
    '.vue',
    '.jsx',
    '.tsx',
]);

const riskyClasses = new Set([
    'container',
    'row',
    'col',
    'card',
    'btn',
    'nav',
    'modal',
    'active',
    'dropdown',
    'collapse',
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

        const ext = path.extname(entry.name);

        if (allowedExtensions.has(ext)) {
            result.push(fullPath);
        }
    }

    return result;
}

function getLineNumber(content, index) {
    return content.slice(0, index).split('\n').length;
}

async function scanFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const problems = [];

    const classAttrRegex = /class\s*=\s*["']([^"']+)["']/gi;
    let match;

    while ((match = classAttrRegex.exec(content)) !== null) {
        const classes = match[1].split(/\s+/).filter(Boolean);

        for (const className of classes) {
            if (riskyClasses.has(className)) {
                problems.push({
                    file: filePath,
                    line: getLineNumber(content, match.index),
                    className,
                    context: match[0],
                });
            }
        }
    }

    return problems;
}

async function main() {
    const files = await walk(rootDir);
    const problems = [];

    for (const file of files) {
        const fileProblems = await scanFile(file);
        problems.push(...fileProblems);
    }

    if (problems.length === 0) {
        console.log(' Рискованные классы не найдены.');
        process.exit(0);
    } else {
        problems.forEach(problem => {
            console.log(`Problems: File: ${problem.file}, Line: ${problem.line}, Class: ${problem.className}, Context: ${problem.context}`);
        });
    }

    console.log('Найдены потенциально рискованные классы - Potentially risky classes have been identified:: \n');
    console.log(`Итого найдено - All problems: ${problems.length}`);
    console.log('Важно: это не всегда ошибка. Эти классы могут конфликтовать с Bootstrap/Bitrix, но переименовывать их нужно только после оценки риска - important: This isnt always an error. These classes may conflict with Bootstrap/Bitrix, but you should only rename them after assessing the risk. .');
}

main().catch((error) => {
    console.error('Error scanning files:', error);
    process.exit(1);
});

