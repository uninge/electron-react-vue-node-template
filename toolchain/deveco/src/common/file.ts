import fs from 'node:fs';
import path from 'node:path';

export function fileExists(filePath: string): boolean {
	return fs.existsSync(filePath);
}

export function readFile(filePath: string): string {
	return fs.readFileSync(filePath, 'utf-8');
}

export function readJsonFile<T = unknown>(filePath: string): T {
	const content = readFile(filePath);
	return JSON.parse(content);
}

export function writeFile(filePath: string, content: string): void {
	const dir = path.dirname(filePath);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	fs.writeFileSync(filePath, content, 'utf-8');
}

export function writeJsonFile<T = unknown>(filePath: string, data: T, pretty: boolean = true): void {
	const content = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
	writeFile(filePath, content);
}

export function deleteFile(filePath: string): void {
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
	}
}

export function ensureDir(dirPath: string): void {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}
