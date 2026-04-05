import { execSync } from 'node:child_process';

export function isGitRepository(): boolean {
	try {
		execSync('git rev-parse --is-inside-work-tree', { stdio: 'pipe' });
		return true;
	} catch {
		return false;
	}
}

export function getGitBranch(): string {
	try {
		return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
	} catch {
		return 'unknown';
	}
}

export function getGitCommitHash(short: boolean = true): string {
	try {
		const format = short ? '%h' : '%H';
		return execSync(`git show -s --format=${format}`, { encoding: 'utf-8' }).trim();
	} catch {
		return 'unknown';
	}
}

export function getGitCommitMessage(): string {
	try {
		return execSync('git log -1 --pretty=%s', { encoding: 'utf-8' }).trim();
	} catch {
		return 'unknown';
	}
}

export function getGitRemoteUrl(): string | null {
	try {
		return execSync('git config --get remote.origin.url', { encoding: 'utf-8' }).trim();
	} catch {
		return null;
	}
}
