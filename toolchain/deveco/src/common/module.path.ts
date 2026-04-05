import fs from "node:fs";
import path from "node:path";

const rootDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath: string, root = rootDirectory) => path.resolve(root, relativePath);

export const electronDevEntry = resolvePath('src/index.dev.ts');
export const electronProdEntry = resolvePath('src/index.ts');
export const electronPreloadScript = resolvePath('src/preload.ts');

export const reactEntry = resolvePath('src/index.tsx');
export const reactTemplate = resolvePath('public/index.html');
export const vueEntry = resolvePath('src/index.ts');
export const vueTemplate = resolvePath('public/index.html');
export const nodeEntry = resolvePath('src/index.ts');


