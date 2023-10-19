<script lang="ts">
	import { getChartConfig } from '$lib/stores';
	import { lineGenerator } from '$lib/utils';
	import type { ChartData } from '$lib/models';
	import type { ScaleOrdinal } from 'd3';

	export let data: [string, ChartData[]];
	export let colors: ScaleOrdinal<string, string, never>;

	// If the 'name' in the data array has a numeric value, it is replaced with 'Simulation ${state}' for clarity.
	// This is done to simplify attribute retrieval and to handle scenarios where the chart has multiple simulations.
	let [name, values] = data;

	const match = name.match(/Simulation ([A-Z]) - (\d+)/);
	if (match) {
		name = name.split(' - ')[0].trim();
	}

	const chartConfig = getChartConfig();

	const getStrokeColor = (name: string) => (name.startsWith('Simulation') ? 'gray' : colors(name));
	const getStrokeWidth = (name: string) => (name.startsWith('Simulation') ? 1 : 3);

	$: xScale = $chartConfig.xScale;
	$: yScale = $chartConfig.yScale;

	$: linesDisplayed = $chartConfig.linesDisplayed;

	$: getStrokeOpacity = (name: string) => (linesDisplayed.get(name) ? 1 : 0);
</script>

<g>
	<path
		data-name={name}
		class="line"
		fill="none"
		stroke={getStrokeColor(name)}
		stroke-width={getStrokeWidth(name)}
		stroke-opacity={getStrokeOpacity(name)}
		d={lineGenerator(values, xScale, yScale)}
	/>
</g>

<style>
	.line {
		transition: stroke-opacity 0.3s ease;
	}
</style>
