<script lang="ts">
	import { FileBarChart2, FileImage, FileText } from 'lucide-svelte';
	import { downloadChartPNG, downloadChartSVG, downloadInputData, clickOutside } from '$lib/utils';
	import { getChartConfig } from '$lib/stores';

	export let closeMenu: () => void;

	const chartConfig = getChartConfig();
	const chartInputs = $chartConfig.chartInputs;
</script>

<div
	class="w-[200px] absolute top-8 translate-x-[-90%] rounded-lg bg-background border border-border overflow-hidden p-1 shadow-md"
	role="menu"
	tabindex="0"
	use:clickOutside
	on:outclick={closeMenu}
>
	<button class="btn-menu" on:click={() => downloadInputData(chartInputs)}>
		<span class="mr-4">
			<FileText size="16" />
		</span>
		Download Inputs
	</button>
	<button class="btn-menu" on:click={() => downloadChartPNG('#chart')}>
		<span class="mr-4">
			<FileImage size="16" />
		</span>
		Download PNG
	</button>
	<button class="btn-menu" on:click={() => downloadChartSVG('#chart')}>
		<span class="mr-4">
			<FileBarChart2 size="16" />
		</span>
		Download SVG
	</button>
</div>
