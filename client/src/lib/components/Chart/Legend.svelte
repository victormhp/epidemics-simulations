<script lang="ts">
	import { getChartConfig, updateChartConfig } from '$lib/stores';
	import type { ScaleOrdinal } from 'd3';

	export let colors: ScaleOrdinal<string, string, never>;

	let legendElements: SVGGElement[] = [];
	const chartConfig = getChartConfig();
	const legends = $chartConfig.legends;

	const getFillColor = (legend: string) => {
		if (legend.startsWith('Simulation')) {
			return 'gray';
		}
		return colors(legend);
	};

	$: dimensions = $chartConfig.dimensions;

	$: linesDisplayed = $chartConfig.linesDisplayed;

	$: getFillOpacity = (legend: string) => (linesDisplayed.get(legend) ? 1 : 0.4);

	function calculateLegendPosition(index: number, width: number) {
		if (index % 2 === 0) {
			return `translate(${index * (width / legends.length)}, 10)`;
		}
		return `translate(${(index - 1) * (width / legends.length)}, 40)`;
	}

	function toggleVisibility(event: MouseEvent) {
		const legendElement = event.currentTarget as SVGGElement;
		const { name } = legendElement.dataset;

		if (name) {
			linesDisplayed.set(name, !linesDisplayed.get(name));
			updateChartConfig(chartConfig, { linesDisplayed });
		}
	}
</script>

<g transform="translate(0,{dimensions.height + dimensions.marginBottom / 2})">
	{#each legends as legend, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<g
			bind:this={legendElements[i]}
			data-name={legend}
			class="legend outline-ring outline-offset-4 cursor-pointer select-none"
			transform={calculateLegendPosition(i, dimensions.width)}
			role="button"
			tabindex="0"
			fill-opacity={getFillOpacity(legend)}
			on:click={toggleVisibility}
		>
			<rect width="16" height="16" rx="2" ry="2" fill={getFillColor(legend)} />
			<text x="20" y="12" style="font-family: sans-serif; font-size: 12px; fill: #777;">
				{legend}
			</text>
		</g>
	{/each}
</g>

<style>
	.legend {
		transition: fill-opacity 0.3s ease;
	}
</style>
