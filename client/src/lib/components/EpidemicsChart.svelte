<script lang="ts">
	import type { ChartData, ChartInputs } from '$lib/models';
	import ClipPath from './Chart/ClipPath.svelte';
	import Zoomable from './Chart/Zoomable.svelte';
	import Legend from './Chart/Legend.svelte';
	import Labels from './Chart/Labels.svelte';
	import Lines from './Chart/Lines.svelte';
	import Chart from './Chart/Chart.svelte';
	import Axis from './Chart/Axis.svelte';
	import * as d3 from 'd3';

	export let chartData: ChartData[];
	export let chartInputs: ChartInputs;

	const chartLines = d3.groups(chartData, (d) => d.strategy);
	const strategyLines = chartLines.filter((d) => !d[0].startsWith('Simulation'));
	const simulationLines = chartLines.filter((d) => d[0].startsWith('Simulation'));

	const legends = [...strategyLines.map((d) => d[0]), 'Simulations'];
	const colors = d3.scaleOrdinal(d3.schemeCategory10).domain(legends);

	const width = 800;
	const height = 600;
	const margines = {
		marginTop: 30,
		marginRight: 40,
		marginBottom: 125,
		marginLeft: 90
	};

	$: dimensions = {
		width: width - margines.marginLeft - margines.marginRight,
		height: height - margines.marginBottom - margines.marginTop,
		...margines
	};

	$: xScale = d3
		.scaleLinear()
		.domain([0, d3.max(chartData, (d) => d.x) ?? 0])
		.nice()
		.range([0, dimensions.width]);

	$: yScale = d3
		.scaleLinear()
		.domain([0, d3.max(chartData, (d) => d.y) ?? 0])
		.nice()
		.range([dimensions.height, 0]);
</script>

<Chart {chartInputs} {xScale} {yScale} {legends} {dimensions}>
	<Zoomable>
		<ClipPath id="clip" />
		<Axis />
		<g id="lines" clip-path="url(#clip)">
			<Lines data={simulationLines} {colors} />
			<Lines data={strategyLines} {colors} strokeWidth="3" />
		</g>
	</Zoomable>
	<Labels xLabel="t" yLabel="Number infected" />
	<Legend {colors} />
</Chart>
