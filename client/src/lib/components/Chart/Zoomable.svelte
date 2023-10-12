<script lang="ts">
	import { getChartConfig, updateChartConfig, chartActions } from '$lib/stores/';
	import type { ChartData } from '$lib/models';
	import { chartResponse } from '$lib/stores';
	import * as d3 from 'd3';

	let graphElement: SVGGElement;
	let graph: d3.Selection<SVGGElement, unknown, null, undefined>;

	const chartConfig = getChartConfig();
	const xScale = $chartConfig.xScale;
	const yScale = $chartConfig.yScale;
	const dimensions = $chartConfig.dimensions;

	const isZoomEnable = $chartResponse.inputs.zoom;

	function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, ChartData>) {
		const zoomState = event.transform;
		const xz = zoomState.rescaleX(xScale);
		const yz = zoomState.rescaleY(yScale);

		updateChartConfig(chartConfig, { xScale: xz, yScale: yz });
	}

	const zoom = d3
		.zoom<SVGGElement, unknown>()
		.scaleExtent([1, 25])
		.extent([
			[dimensions.marginLeft, dimensions.marginTop],
			[dimensions.width - dimensions.marginRight, dimensions.height - dimensions.marginBottom]
		])
		.translateExtent([
			[0, 0],
			[dimensions.width, dimensions.height]
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
			width={dimensions.width}
			height={dimensions.height}
			style="pointer-events: all;"
			fill="white"
		/>
		<slot />
	</g>
{:else}
	<slot />
{/if}
