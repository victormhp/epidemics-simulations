import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const docs = await import(`../../../docs/${params.slug}.md`);

		return {
			meta: docs.metadata,
			content: docs.default
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
};
