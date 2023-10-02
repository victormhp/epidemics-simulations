<script lang="ts">
	import { setSelectedTab, getSelectedTab, setTabTitles } from '$lib/stores/tabs.store';

	let selectedTab = '1';
	let tabList: HTMLElement;

	setSelectedTab(selectedTab);
	$: selectedTabStore = getSelectedTab();

	const titles = setTabTitles([]);

	function onKeyDown(event: KeyboardEvent) {
		if (event.code === 'ArrowRight') {
			const tabs = Array.from(tabList.querySelectorAll('.tab'));

			const currTab = event.currentTarget as HTMLElement;
			const currIndex = tabs.indexOf(currTab);

			const nextIndex = currIndex + 1 >= tabs.length ? 0 : currIndex + 1;
			const nextTab = tabs[nextIndex] as HTMLButtonElement;

			if (nextTab) {
				nextTab.click();
				nextTab.focus();
			}
		} else if (event.code === 'ArrowLeft') {
			const tabs = Array.from(tabList.querySelectorAll('.tab'));

			const currTab = event.currentTarget as HTMLElement;
			const currIndex = tabs.indexOf(currTab);

			const nextIndex = currIndex - 1 < 0 ? tabs.length - 1 : currIndex - 1;
			const nextTab = tabs[nextIndex] as HTMLButtonElement;

			if (nextTab) {
				nextTab.click();
				nextTab.focus();
			}
		}
	}
</script>

<div bind:this={tabList} class="tab-list flex justify-between" role="tablist">
	{#each $titles as { id, title } (id)}
		<button
			class="tab btn-tab"
			class:selected={$selectedTabStore === id}
			role="tab"
			tabindex={$selectedTabStore === id ? 0 : -1}
			aria-selected={$selectedTabStore === id}
			on:click={() => ($selectedTabStore = id)}
			on:keydown={onKeyDown}
		>
			{title}
		</button>
	{/each}
</div>

<div
	class="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
	role="tabpanel"
	tabindex="0"
>
	<slot {selectedTab} />
</div>

<style lang="postcss">
	.selected {
		@apply border-foreground z-50;
	}
</style>
