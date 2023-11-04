import { createTsupConfig } from '../../tsup.config.js';

export default createTsupConfig({
	entry: ['src/index.ts', 'src/routes/**/*.ts'],
	sourcemap: false,
	format: ['esm'],
});
