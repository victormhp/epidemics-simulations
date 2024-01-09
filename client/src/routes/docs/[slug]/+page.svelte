<script>
	import { CopyCodeInjector } from '$lib/components/ui';

	export let data;
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="documentation" />
	<meta property="og:title" content={data.meta.subtitle} />
	<meta property="og:description" content={data.meta.description} />
</svelte:head>

<article class="px-4 lg:px-12">
	<p class="font-bold text-muted-foreground/50 uppercase">{data.meta.subtitle}</p>
	<h1 class="text-4xl mb-16 lg:text-5xl">{data.meta.title}</h1>
	<div
		class="prose prose-zinc prose-h2:border-b prose-h2:border-border prose-a:no-underline prose-a:font-bold max-w-none"
	>
		<CopyCodeInjector>
			<svelte:component this={data.content} />
		</CopyCodeInjector>
	</div>
</article>
