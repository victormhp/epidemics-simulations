<script lang="ts">
	import { ChartForm, ChartFormFile, EpidemicsChart, Tabs, TabItem } from '$lib/components';
	import { chartResponse } from '$lib/stores';
	import { Loader2 } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	let containerWidth: number;
	let containerHeight: number;
</script>

<section class="space-y-8">
	<Tabs>
		<TabItem id="1" title="Upload data">
			<ChartForm />
		</TabItem>
		<TabItem id="2" title="Upload files">
			<ChartFormFile />
		</TabItem>
	</Tabs>
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
		<EpidemicsChart width={containerWidth} height={containerHeight} />
	{/if}
</section>
