<script lang="ts">
	import { chartLines, chartScales } from '$lib/stores';
	import { lineGenerator, matchSimulation } from '$lib/utils';
	import type { ChartData } from '$lib/models';
	import type { ScaleOrdinal } from 'd3';

	export let data: [string, ChartData[]];
	export let colors: ScaleOrdinal<string, string, never>;

	let [name, values] = data;

	$: getStrokeOpacity = (name: string) => ($chartLines.linesDisplayed.get(name) ? 1 : 0);
</script>

<g>
	<path
		data-name={name}
		class="line"
		fill="none"
		stroke={colors(name)}
		stroke-width={2}
		stroke-opacity={getStrokeOpacity(name)}
		d={lineGenerator(values, $chartScales.xScale, $chartScales.yScale)}
	/>
</g>

<style>
	.line {
		transition: stroke-opacity 0.3s ease;
	}
</style>
