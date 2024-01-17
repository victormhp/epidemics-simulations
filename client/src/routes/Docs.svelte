<script lang="ts">
	import { DocsMenu } from '$lib/components';

	export let slug: string;

	type Metadata = {
		title: string;
		subtitle: string;
		description: string;
	};

	let meta: Metadata | null;
	let content: any;

	async function loadDocs(slug: string) {
		try {
			slug ||= 'introduction';
			const docs = await import(`../docs/${slug}.md`);

			meta = docs.metadata;
			content = docs.default;
		} catch (e) {
			console.error(`Could not find ${slug}`, e);
		}
	}

	$: loadDocs(slug);
</script>

<div class="flex">
	<main class="max-w-[125ch] px-4 py-28 lg:pl-[min(25rem,30vw)]">
		{#if meta && content}
			<article class="px-4 lg:px-12">
				<p class="font-bold text-muted-foreground/50 uppercase">{meta.subtitle}</p>
				<h1 class="text-4xl mb-16 lg:text-5xl">{meta.title}</h1>
				<div
					class="prose prose-zinc prose-h2:border-b prose-h2:border-border prose-a:no-underline prose-a:font-bold max-w-none"
				>
					<svelte:component this={content} />
				</div>
			</article>
		{/if}
	</main>
	<DocsMenu />
</div>
