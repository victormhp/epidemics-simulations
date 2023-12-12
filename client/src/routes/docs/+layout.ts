import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, url }) => {
	const response = await fetch('/api/docs');
	const docs = await response.json();
	const pathname = url.pathname;

	return { docs, pathname };
};
