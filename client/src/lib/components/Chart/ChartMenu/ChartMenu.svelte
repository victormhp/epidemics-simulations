<script lang="ts">
	import ChartDownload from './ChartDownload.svelte';
	import ChartActions from './ChartActions.svelte';

	let open = false;
	const toggleMenu = () => (open = !open);
	const closeMenu = () => (open = false);
</script>

<ChartActions {toggleMenu} />
{#if open}
	<ChartDownload {closeMenu} />
{/if}
