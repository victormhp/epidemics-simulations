import type { ComponentType } from 'svelte';

type MarkdownDoc = {
	metadata: {
		title: string;
		subtitle: string;
		description: string;
	};
	default: ComponentType;
};

export type Docs = {
	slug: string;
	metadata: MarkdownDoc['metadata'];
};
