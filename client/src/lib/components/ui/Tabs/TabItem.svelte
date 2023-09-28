<script lang="ts">
	import { getSelectedTab, getTabTitles } from '$lib/stores';
	import { onDestroy } from 'svelte';

	export let title: string;
	export let id: string;

	const selectedTab = getSelectedTab();
	const tabTitles = getTabTitles();

	$: tabTitles.updateTitle(id, title);

	tabTitles.registerTab(id, title);

	onDestroy(() => {
		tabTitles.unregisterTab(id);
	});
</script>

{#if $selectedTab === id}
	<slot />
{/if}
