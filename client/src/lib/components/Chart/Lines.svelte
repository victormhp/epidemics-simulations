<script lang="ts">
	import { chartLines, chartScales } from '$lib/stores';
	import { lineGenerator, matchSimulation } from '$lib/utils';
	import type { ChartData } from '$lib/models';
	import type { ScaleOrdinal } from 'd3';

	export let data: [string, ChartData[]];
	export let colors: ScaleOrdinal<string, string, never>;

	// If the 'name' in the data array has a numeric value, it is replaced with 'Simulation ${state}' for clarity.
	// This is done to simplify attribute retrieval and to handle scenarios where the chart has multiple simulations.
	let [name, values] = data;

	if (matchSimulation(name)) {
		name = name.split(' - ')[0].trim();
	}

	const getStrokeColor = (name: string) => (name.startsWith('Simulation') ? 'gray' : colors(name));
	const getStrokeWidth = (name: string) => (name.startsWith('Simulation') ? 1 : 3);
	$: getStrokeOpacity = (name: string) => ($chartLines.linesDisplayed.get(name) ? 1 : 0);
</script>

<g>
	<path
		data-name={name}
		class="line"
		fill="none"
		stroke={getStrokeColor(name)}
		stroke-width={getStrokeWidth(name)}
		stroke-opacity={getStrokeOpacity(name)}
		d={lineGenerator(values, $chartScales.xScale, $chartScales.yScale)}
	/>
</g>

<style>
	.line {
		transition: stroke-opacity 0.3s ease;
	}
</style>
