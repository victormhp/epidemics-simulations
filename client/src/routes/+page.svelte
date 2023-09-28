<script lang="ts">
	import { ChartForm, ChartFormFile, EpidemicsChart, Tabs, TabItem } from '$lib/components';
	import { chartResponse } from '$lib/stores';
	import { Loader2 } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
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
	class="flex justify-center items-center grow px-4 py-8 rounded-lg border border-border shadow"
>
	{#if $chartResponse.loading}
		<div in:fade>
			<Loader2 class="h-16 w-16 animate-spin opacity-20" />
		</div>
	{:else if $chartResponse.positions.length > 0}
		<EpidemicsChart />
	{/if}
</section>
