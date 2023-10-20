<script lang="ts">
	import { chartLines, chartScales } from '$lib/stores';
	import { lineGenerator } from '$lib/utils';
	import type { ChartData } from '$lib/models';
	import * as d3 from 'd3';

	export let data: [string, ChartData[]];
	export let colors: d3.ScaleOrdinal<string, string, never>;

	let currentChartData: ChartData[];

	// If the 'name' in the data array has a numeric value, it is replaced with 'Simulation ${state}' for clarity.
	// This is done to simplify attribute retrieval and to handle scenarios where the chart has multiple simulations.
	let [name, values] = data;

	const match = name.match(/Simulation ([A-Z]) - (\d+)/);
	if (match) {
		name = name.split(' - ')[0].trim();
	}

	const getStrokeColor = (name: string) => (name.startsWith('Simulation') ? 'gray' : colors(name));
	const getStrokeWidth = (name: string) => (name.startsWith('Simulation') ? 1 : 3);

	$: xScale = $chartScales.xScale;
	$: yScale = $chartScales.yScale;

	$: getStrokeOpacity = (name: string) => ($chartLines.linesDisplayed.get(name) ? 1 : 0);

	// $: {
	// 	currentChartData = $chartConfig.lines
	// 		.filter(([strategy, _]) => {
	// 			if (strategy.startsWith('Simulation I')) {
	// 				strategy = 'Simulation I';
	// 			}

	// 			return linesDisplayed.get(strategy) !== false;
	// 		})
	// 		.map((line) => line[1])
	// 		.flat();
	// }

	// $: xz = yScale.domain([0, d3.max(currentChartData, (d) => d.y) ?? 0]);
	// $: updateChartConfig(chartConfig, { xScale: xz });

	$: console.log($chartLines.linesDisplayed);
	// $: console.log($chartConfig.lines);
	// $: console.log(currentChartData);
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
