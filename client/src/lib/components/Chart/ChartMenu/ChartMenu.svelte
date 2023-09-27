<script lang="ts">
	import ChartDownload from './ChartDownload.svelte';
	import ChartActions from './ChartActions.svelte';

	let open = false;
	const toggleMenu = () => (open = !open);
	const closeMenu = () => (open = false);
</script>

<div class="absolute top-0 -right-4">
	<ChartActions {toggleMenu} />
	{#if open}
		<ChartDownload {closeMenu} />
	{/if}
</div>
