<script lang="ts">
	import Icon from '@iconify/svelte';
	import { downloadChartPNG, downloadChartSVG, downloadInputData, clickOutside } from '$lib/utils';
	import { chartResponse } from '$lib/stores';

	export let closeMenu: () => void;
	const chartInputs = $chartResponse.inputs;
</script>

<div
	class="w-[200px] absolute top-8 translate-y-[15%] rounded-lg bg-background border border-border overflow-hidden p-1 shadow-md sm:translate-x-[-90%]"
	role="menu"
	tabindex="0"
	use:clickOutside
	on:outclick={closeMenu}
>
	<button class="btn-menu" on:click={() => downloadInputData(chartInputs)}>
		<span class="mr-3">
			<Icon icon="lucide:file-text" width="20" height="20" />
		</span>
		Download Inputs
	</button>
	<button class="btn-menu" on:click={() => downloadChartPNG('#chart')}>
		<span class="mr-3">
			<Icon icon="lucide:file-image" width="20" height="20" />
		</span>
		Download PNG
	</button>
	<button class="btn-menu" on:click={() => downloadChartSVG('#chart')}>
		<span class="mr-3">
			<Icon icon="lucide:file-bar-chart" width="20" height="20" />
		</span>
		Download SVG
	</button>
</div>
