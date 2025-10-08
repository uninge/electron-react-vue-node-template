import fs from "node:fs";
import path from "node:path";

const rootDirectory = fs.realpathSync(process.cwd());
const moduleFileExtensions = ['js', 'jsx', 'ts', 'tsx'];
const resolvePath = (relativePath: string, root = rootDirectory) => path.resolve(root, relativePath);
const resolveModule = (resolveFn: typeof resolvePath, filePath: string) => {
	const extension = moduleFileExtensions.find((extension) =>
		fs.existsSync(resolveFn(`${filePath}.${extension}`)),
	);

	if (extension) {
		return resolveFn(`${filePath}.${extension}`);
	}

	return resolveFn(`${filePath}.js`);
};

export const electronDevEntry = resolvePath('src/index.dev.ts');
export const electronProdEntry = resolvePath('src/index.ts');
export const electronPreloadScript = resolvePath('src/preload.ts');

export const reactEntry = resolvePath('src/index.tsx');
export const reactTemplate = resolvePath('public/index.html');
export const vueEntry = resolvePath('src/index.ts');
export const vueTemplate = resolvePath('public/index.html');
export const nodeEntry = resolvePath('src/index.ts');


