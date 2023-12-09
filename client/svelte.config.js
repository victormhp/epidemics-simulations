import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],

	kit: {
		adapter: adapter({
			pages: '../api/src/static/build',
			assets: '../api/src/static/build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			handleMissingId: 'ignore'
		}
	}
};

export default config;
