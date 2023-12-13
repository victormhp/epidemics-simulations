<script lang="ts">
	import { DocsMenu } from '$lib/components';
</script>

<div class="flex">
	<main class="max-w-[125ch] px-4 py-28 lg:pl-[min(25rem,30vw)]">
		<slot />
	</main>
	<DocsMenu />
</div>
