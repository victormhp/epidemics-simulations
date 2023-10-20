<script lang="ts">
	import { chartDimensions, chartScales, chartActions } from '$lib/stores/';
	import type { ChartData } from '$lib/models';
	import { chartResponse } from '$lib/stores';
	import * as d3 from 'd3';

	let graphElement: SVGGElement;
	let graph: d3.Selection<SVGGElement, unknown, null, undefined>;

	const isZoomEnable = $chartResponse.inputs.zoom;

	function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, ChartData>) {
		const zoomState = event.transform;
		chartScales.rescale(zoomState);
	}

	const zoom = d3
		.zoom<SVGGElement, unknown>()
		.scaleExtent([1, 25])
		.extent([
			[$chartDimensions.marginLeft, $chartDimensions.marginTop],
			[
				$chartDimensions.width - $chartDimensions.marginRight,
				$chartDimensions.height - $chartDimensions.marginBottom
			]
		])
		.translateExtent([
			[0, 0],
			[$chartDimensions.width, $chartDimensions.height]
		])
		.on('zoom', zoomed);

	const resetAxis = () => zoom.transform(graph.transition().duration(500), d3.zoomIdentity);
	const zoomIn = () => zoom.scaleBy(graph.transition(), 2);
	const zoomOut = () => zoom.scaleBy(graph.transition(), 0.5);

	chartActions.set({ resetAxis, zoomIn, zoomOut });

	$: graph = d3.select<SVGGElement, unknown>(graphElement);
	$: graph.call(zoom);
</script>

{#if isZoomEnable}
	<g bind:this={graphElement}>
		<rect
			width={$chartDimensions.width}
			height={$chartDimensions.height}
			style="pointer-events: all;"
			fill="white"
		/>
		<slot />
	</g>
{:else}
	<slot />
{/if}
