import { vitePreprocess } from '@astrojs/svelte';

export default {
	preprocess: vitePreprocess(),
	onwarn: (warning, handler) => {
		if (warning.filename.includes("node_modules/svelte-ux/dist")) return;
		handler(warning);
	},
};
