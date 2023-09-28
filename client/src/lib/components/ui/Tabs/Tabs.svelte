<script lang="ts">
	import { setSelectedTab, getSelectedTab, setTabTitles } from '$lib/stores/tabs.store';

	let selectedTab = '1';

	setSelectedTab(selectedTab);
	$: selectedTabStore = getSelectedTab();

	const titles = setTabTitles([]);
</script>

<div class="flex justify-between">
	{#each $titles as { id, title }}
		<button
			class="btn-tab {$selectedTabStore === id ? 'border-foreground' : null}"
			on:click={() => {
				$selectedTabStore = id;
			}}
		>
			{title}
		</button>
	{/each}
</div>

<slot {selectedTab} />
