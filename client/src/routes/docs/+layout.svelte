<script lang="ts">
	import type { LayoutData } from './$types';
	import { DocsMenu } from '$lib/components';

	export let data: LayoutData;

	$: pagePath = data.pathname;
</script>

{#key pagePath}
	<div class="flex">
		<main class="max-w-[125ch] px-4 py-28 lg:pl-[min(25rem,30vw)]">
			<slot />
		</main>
		<DocsMenu />
	</div>
{/key}
