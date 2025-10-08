export const NODE_ENV = process.env.NODE_ENV;

export const RENDER_DEV_HOST_NAME = process.env.CUSTOM_RENDER_DEV_HOST;
export const RENDER_DEV_PORT = process.env.CUSTOM_RENDER_DEV_PORT;
export const RENDER_PROJECT = process.env.CUSTOM_RENDER_PROJECT;

export const APP_INFO = (process.env.APP_INFO ?? {}) as unknown as {
	name: string;
	version: string;
	branch: string;
	message: string;
	hash: string;
}
