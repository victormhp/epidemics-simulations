<script lang="ts">
	import { getChartConfig, updateChartConfig } from '$lib/stores';
	import * as d3 from 'd3';

	export let colors: d3.ScaleOrdinal<string, string, never>;

	let legendElements: SVGGElement[] = [];
	const chartConfig = getChartConfig();
	const legends = $chartConfig.legends;
	const linesDisplayed = $chartConfig.linesDisplayed;
	$: dimensions = $chartConfig.dimensions;

	function calculateLegendPosition(index: number, width: number) {
		if (index % 2 === 0) {
			return `translate(${index * (width / legends.length)}, 10)`;
		}
		return `translate(${(index - 1) * (width / legends.length)}, 40)`;
	}

	function getFillColor(legend: string) {
		return legend.startsWith('Simulation') ? 'gray' : colors(legend);
	}

	function toggleVisibility(event: MouseEvent | KeyboardEvent) {
		const legendElement = event.currentTarget as SVGGElement;
		const { name } = legendElement.dataset;

		const opacity = d3.select(legendElement).attr('fill-opacity');

		if (typeof name == 'string') {
			d3.select(legendElement)
				.transition()
				.duration(200)
				.attr('fill-opacity', opacity === '1' ? '0.40' : '1');

			linesDisplayed.set(name, !linesDisplayed.get(name));
			updateChartConfig(chartConfig, { linesDisplayed });
		}
	}
</script>

<g id="legend" transform="translate(0,{dimensions.height + dimensions.marginBottom / 2})">
	{#each legends as legend, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<g
			bind:this={legendElements[i]}
			data-name={legend}
			class="outline-ring outline-offset-4 cursor-pointer select-none"
			transform={calculateLegendPosition(i, dimensions.width)}
			role="button"
			tabindex="0"
			fill-opacity="1"
			on:click={toggleVisibility}
		>
			<rect width="16" height="16" rx="2" ry="2" fill={getFillColor(legend)} />
			<text x="20" y="12" style="font-family: sans-serif; font-size: 12px; fill: #777;"
				>{legend}</text
			>
		</g>
	{/each}
</g>
