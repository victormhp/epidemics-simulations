<script lang="ts">
	import { getChartConfig } from '$lib/stores';

	export let xLabel: string;
	export let yLabel: string;

	const chartConfig = getChartConfig();
	$: dimensions = $chartConfig.dimensions;
</script>

<g id="labels">
	<text
		x={dimensions.width / 2}
		y="{dimensions.height + dimensions.marginBottom / 3} "
		style="font-family: sans-serif; font-size: 14px; font-style: italic; fill: #777;">{xLabel}</text
	>
	<text
		transform="rotate(-90)"
		x={-(dimensions.height / 2)}
		y={-dimensions.marginLeft}
		dy="1em"
		text-anchor="middle"
		style="font-family: sans-serif; font-size: 14px; fill: #777;"
	>
		{yLabel}
	</text>
</g>
