import { json, type RequestHandler } from '@sveltejs/kit';
import type { Docs } from '$lib/models';

async function getDocs() {
	const docs: Docs[] = [];

	const paths = import.meta.glob('/src/docs/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Docs, 'slug'>;
			const doc = { ...metadata, slug } satisfies Docs;
			docs.push(doc);
		}
	}
	return docs;
}

export const GET: RequestHandler = async () => {
	const docs = await getDocs();
	return json(docs);
};
