<script>
	import { CopyCodeInjector } from '$lib/components/ui';

	export let data;

	const { meta, content } = data;
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta property="og:type" content="documentation" />
	<meta property="og:title" content={meta.subtitle} />
	<meta property="og:description" content={meta.description} />
</svelte:head>

<article class="px-4 lg:px-12">
	<p class="font-semibold text-muted-foreground/50 uppercase">{meta.subtitle}</p>
	<h1 class="text-4xl mb-16 lg:text-5xl">{meta.title}</h1>
	<div
		class="prose prose-zinc prose-h2:border-b prose-h2:border-border prose-a:no-underline prose-a:font-semibold max-w-none"
	>
		<CopyCodeInjector>
			<svelte:component this={content} />
		</CopyCodeInjector>
	</div>
</article>
