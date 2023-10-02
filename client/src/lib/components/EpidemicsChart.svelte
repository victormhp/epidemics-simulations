<script lang="ts">
	import { ClipPath, Axis, Zoomable, Legend, Labels, Lines, Chart } from '$lib/components/Chart';
	import { chartResponse } from '$lib/stores';
	import * as d3 from 'd3';

	const chartData = $chartResponse.positions;
	const chartLines = d3.groups(chartData, (d) => d.strategy);

	const legends = chartLines.map((line) => line[0]);
	const chartLegends = legends.reduce((result, item) => {
		const simulationIteration = item.split(' ')[1];
		if (!isNaN(Number(simulationIteration))) {
			if (!result.includes('Simulation')) {
				result.push('Simulation');
			}
		} else {
			result.push(item);
		}
		return result;
	}, [] as string[]);

	const colors = d3.scaleOrdinal(d3.schemeCategory10).domain(chartLegends);

	const width = 1000;
	const height = 700;
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

<Chart {xScale} {yScale} legends={chartLegends} {dimensions}>
	<Zoomable>
		<ClipPath id="clip" />
		<Axis />
		<g id="lines" clip-path="url(#clip)">
			{#each chartLines as line}
				<Lines data={line} {colors} />
			{/each}
		</g>
	</Zoomable>
	<Labels xLabel="t" yLabel="Number infected" />
	<Legend {colors} />
</Chart>
