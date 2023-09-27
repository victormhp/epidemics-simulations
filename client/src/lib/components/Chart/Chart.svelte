<script lang="ts">
	import ChartMenu from './ChartMenu/ChartMenu.svelte';
	import type { ChartInputs, Dimensions } from '$lib/models';
	import { setChartConfig } from '$lib/stores';
	import { fade } from 'svelte/transition';
	import type { ScaleLinear } from 'd3';

	export let chartInputs: ChartInputs;
	export let xScale: ScaleLinear<number, number, never>;
	export let yScale: ScaleLinear<number, number, never>;
	export let dimensions: Dimensions;
	export let legends: string[];

	const linesDisplayed = legends.reduce((map, key) => map.set(key, true), new Map());

	setChartConfig({ chartInputs, dimensions, legends, xScale, yScale, linesDisplayed });
</script>

<div class="relative">
	<svg
		id="chart"
		in:fade
		width={dimensions.width + dimensions.marginLeft + dimensions.marginRight}
		height={dimensions.height + dimensions.marginBottom + dimensions.marginTop}
	>
		<rect
			width={dimensions.width + dimensions.marginLeft + dimensions.marginRight}
			height={dimensions.height + dimensions.marginBottom + dimensions.marginTop}
			fill="white"
		/>
		<g transform="translate({dimensions.marginLeft}, {dimensions.marginTop})">
			<slot />
		</g>
	</svg>
	<ChartMenu />
</div>
