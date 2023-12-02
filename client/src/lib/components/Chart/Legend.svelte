<script lang="ts">
	import { chartDimensions, chartLines, getLegend } from '$lib/stores';
	import type { ScaleOrdinal } from 'd3';

	export let colors: ScaleOrdinal<string, string, never>;

	let legendElements: SVGGElement[] = [];

	const legend = getLegend();

	$: getFillOpacity = (model: string) => ($chartLines.linesDisplayed.get(model) ? 1 : 0.4);

	function calculateLegendPosition(index: number, containerWidth: number, elementWidth: number) {
		const maxElementsPerRow = Math.max(1, Math.floor(containerWidth / elementWidth));

		const row = Math.floor(index / maxElementsPerRow);
		const col = index % maxElementsPerRow;

		const x = col * elementWidth;
		const y = row * 20;

		return `translate(${x},${y})`;
	}

	function toggleVisibility(event: MouseEvent) {
		const legendElement = event.currentTarget as SVGGElement;
		const { name } = legendElement.dataset;

		if (name) {
			const linesDisplayed = $chartLines.linesDisplayed;
			linesDisplayed.set(name, !$chartLines.linesDisplayed.get(name));

			chartLines.update((lines) => {
				return {
					...lines,
					linesDisplayed
				};
			});
		}
	}
</script>

<g transform="translate(0,{$chartDimensions.height + $chartDimensions.marginBottom / 2})">
	{#each legend as model, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<g
			bind:this={legendElements[i]}
			data-name={model}
			class="legend outline-ring outline-offset-4 cursor-pointer select-none"
			transform={calculateLegendPosition(i, $chartDimensions.width, 200)}
			role="button"
			tabindex="0"
			fill-opacity={getFillOpacity(model)}
			on:click={toggleVisibility}
		>
			<rect width="16" height="16" rx="2" ry="2" fill={colors(model)} />
			<text x="20" y="12" style="font-family: sans-serif; font-size: 12px; fill: #777;">
				{model}
			</text>
		</g>
	{/each}
</g>

<style>
	.legend {
		transition: fill-opacity 0.3s ease;
	}
</style>
