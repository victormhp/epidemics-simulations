<script lang="ts">
	import Icon from '@iconify/svelte';
	import '$lib/styles/index.css';
	import { ChartForm, ChartFormYaml, ChartFormSim, EpidemicsChart } from '$lib/components';
	import { Tab, TabGroup } from '$lib/components/ui';
	import { chartResponse } from '$lib/stores';
	import { fade } from 'svelte/transition';

	let containerWidth = 0;
	let containerHeight = 0;

	let tabSet: number = 0;
</script>

<main class="w-full h-screen grid grid-cols-1 gap-8 p-8 pt-28 xl:grid-cols-[2fr_5fr]">
	<section class="space-y-8">
		<TabGroup>
			<Tab bind:group={tabSet} name="tab1" value={0}>Form Data</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>YAML</Tab>
			<Tab bind:group={tabSet} name="tab2" value={2}>Simulation Investigation</Tab>
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<ChartForm />
				{:else if tabSet === 1}
					<ChartFormYaml />
				{:else if tabSet === 2}
					<ChartFormSim />
				{/if}
			</svelte:fragment>
		</TabGroup>
	</section>
	<section
		bind:clientWidth={containerWidth}
		bind:clientHeight={containerHeight}
		class="h-[600px] flex justify-center items-center grow rounded-lg border border-border shadow sm:px-4 sm:py-8 xl:h-full"
	>
		{#if $chartResponse.loading}
			<div in:fade>
				<Icon
					class="h-16 w-16 animate-spin opacity-20"
					icon="tabler:loader-2"
					width="48"
					height="48"
				/>
			</div>
		{:else if $chartResponse.positions.length > 0}
			<div in:fade>
				<EpidemicsChart width={containerWidth} height={containerHeight} />
			</div>
		{/if}
	</section>
</main>
