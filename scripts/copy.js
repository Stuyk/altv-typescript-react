import fs from 'fs-extra'
import * as glob from 'glob';
import { getResources, normalizeFilePath } from './shared.js';

async function copyResourceAssets(name) {
    const startTime = Date.now();
    const files = glob.sync([`./src/${name}/**/*.!(ts)`, './src-webviews/**/*.toml']);

    let filesCopied = 0;
    for (let file of files) {
        const filePath = normalizeFilePath(file);

        if(filePath.includes('src/')) {
            const finalPath = filePath.replace('src/', 'resources/');
            fs.copySync(filePath, finalPath, {overwrite: true});
        }

        if (filePath.includes('src-webviews')) {
            const finalPath = filePath.replace('src-webviews/', 'resources/webviews/');
            fs.copySync(filePath, finalPath, { overwrite: true });
        }

        filesCopied += 1;
    }

    console.log(`[${name}] | ${filesCopied} Files Moved | ${Date.now() - startTime}ms`);
}

for (let resource of getResources()) {
    copyResourceAssets(resource);
}
