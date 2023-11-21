<script lang="ts">
	import { ChartMenu } from './ChartMenu';
	import { chartDimensions, chartLines, chartScales, setLegend } from '$lib/stores';
	import type { Line, Dimensions } from '$lib/models';
	import type { ScaleLinear } from 'd3';

	export let dimensions: Dimensions;
	export let xScale: ScaleLinear<number, number, never>;
	export let yScale: ScaleLinear<number, number, never>;
	export let lines: Line[];
	export let legends: string[];

	const linesDisplayed = legends.reduce((map, key) => map.set(key, true), new Map());

	chartDimensions.set(dimensions);
	chartLines.set({ lines, linesDisplayed });
	chartScales.setDefault({ xScale, yScale });
	setLegend(legends);
</script>

<div class="relative">
	<svg
		id="chart"
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
	<div class="w-full absolute top-0 left-0 mb-4 sm:w-auto sm:left-auto sm:-right-4">
		<ChartMenu />
	</div>
</div>
