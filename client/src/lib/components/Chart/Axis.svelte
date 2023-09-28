<script lang="ts">
	import { getChartConfig } from '$lib/stores';

	const chartConfig = getChartConfig();
	const dimensions = $chartConfig.dimensions;

	$: xScale = $chartConfig.xScale;
	$: yScale = $chartConfig.yScale;
</script>

<g transform="translate(0,{dimensions.height})" style="font-size: 12;">
	{#each xScale.ticks() as tick}
		<g transform="translate({xScale(tick)}, 0)">
			<line stroke="#777" y2="6" y1={-dimensions.height} stroke-width="0.5" stroke-opacity="0.2" />
			<text fill="#777" y="9" dy="0.71em">{tick}</text>
		</g>
	{/each}
</g>
<g style="font-size: 12;" text-anchor="end">
	{#each yScale.ticks() as tick}
		<g transform="translate(0, {yScale(tick)})">
			<line stroke="#777" x2="-6" x1={dimensions.width} stroke-width="0.5" stroke-opacity="0.2" />
			<text fill="#777" x="-9" dy="0.32em">{tick}</text>
		</g>
	{/each}
</g>
