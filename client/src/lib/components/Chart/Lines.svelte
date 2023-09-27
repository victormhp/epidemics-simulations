<script lang="ts">
	import { getChartConfig } from '$lib/stores';
	import type { ChartData } from '$lib/models';
	import { lineGenerator } from '$lib/utils';
	import * as d3 from 'd3';

	export let data: [string, ChartData[]][];
	export let strokeWidth = '1';
	export let colors: d3.ScaleOrdinal<string, string, never>;

	let pathElements: SVGPathElement[] = [];
	let linesDisplayed: Map<string, boolean>;
	const chartConfig = getChartConfig();

	$: xScale = $chartConfig.xScale;
	$: yScale = $chartConfig.yScale;

	$: {
		linesDisplayed = $chartConfig.linesDisplayed;

		pathElements.forEach((e) => {
			const path = d3.select(e);
			let name = path.attr('data-name');

			if (name.startsWith('Simulation')) {
				name = 'Simulations';
			}

			const visibility = linesDisplayed.get(name);
			path
				.transition()
				.duration(200)
				.attr('stroke-opacity', visibility ? '1' : '0');
		});
	}

	function getStrokeColor(name: string) {
		return name.startsWith('Simulation') ? 'gray' : colors(name);
	}
</script>

<g>
	{#each data as [name, values], i}
		<path
			bind:this={pathElements[i]}
			data-name={name}
			fill="none"
			stroke={getStrokeColor(name)}
			stroke-width={strokeWidth}
			stroke-opacity="1"
			d={lineGenerator(values, xScale, yScale)}
		/>
	{/each}
</g>
