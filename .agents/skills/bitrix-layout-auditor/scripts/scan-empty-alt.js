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
    '.vue',
    '.jsx',
    '.tsx',
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

function isDecorativeImage(tag) {
    return /role\s*=\s*["']presentation["']/i.test(tag)
        || /aria-hidden\s*=\s*["']true["']/i.test(tag);
}

async function scanFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const problems = [];
    const imgRegex = /<img\b[^>]*>/gi;

    let match;

    while ((match = imgRegex.exec(content)) !== null) {
        const tag = match[0];
        const line = getLineNumber(content, match.index);

        const hasAlt = /\salt\s*=/i.test(tag);
        const hasEmptyAlt = /\salt\s*=\s*["']\s*["']/i.test(tag);

        if (!hasAlt) {
            problems.push({
                file: filePath,
                line,
                type: 'missing-alt',
                tag,
            });

            continue;
        }

        if (hasEmptyAlt && !isDecorativeImage(tag)) {
            problems.push({
                file: filePath,
                line,
                type: 'empty-alt',
                tag,
            });
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
        console.log('Проблем с alt у изображений не найдено - No issues with image alt attributes found');
        process.exit(0);
    } else {
        problems.forEach(problem => {
          console.log(`Problems: File: ${problem.file}, Line: ${problem.line}, Type: ${problem.type}, Tag: ${problem.tag}`);
        });
    }

}

main().catch((error) => {
    console.error('Error scanning files:', error);
    process.exit(1);
});
