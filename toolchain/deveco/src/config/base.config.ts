import path from 'node:path';
import type { RsbuildConfig } from '@rsbuild/core'
import {OUTPUT_DIR_NAME} from "../common/constant";

export const baseConfig: RsbuildConfig = {
	root: process.cwd(),
	mode: 'production',
	output: {
		cleanDistPath: true,
		distPath: {
			root: path.resolve(process.cwd(), OUTPUT_DIR_NAME),
		}
	}
}
