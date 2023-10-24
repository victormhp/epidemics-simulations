<script lang="ts">
	import { ChartForm, ChartFormFile, EpidemicsChart } from '$lib/components';
	import { Tab, TabGroup } from '$lib/components/ui/Tabs';
	import { chartResponse } from '$lib/stores';
	import { Loader2 } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	let containerWidth: number;
	let containerHeight: number;

	let tabSet: number = 0;
</script>

<section class="space-y-8">
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>Upload data</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>Upload Files</Tab>
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<ChartForm />
			{:else if tabSet === 1}
				<ChartFormFile />
			{/if}
		</svelte:fragment>
	</TabGroup>
</section>
<section
	bind:clientWidth={containerWidth}
	bind:clientHeight={containerHeight}
	class="h-[600px] flex justify-center items-center grow px-4 py-8 rounded-lg border border-border shadow lg:h-full"
>
	{#if $chartResponse.loading}
		<div in:fade>
			<Loader2 class="h-16 w-16 animate-spin opacity-20" />
		</div>
	{:else if $chartResponse.positions.length > 0}
		<div in:fade>
			<EpidemicsChart width={containerWidth} height={containerHeight} />
		</div>
	{/if}
</section>
