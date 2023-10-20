<script lang="ts">
	import { chartDimensions } from '$lib/stores';

	export let xLabel: string;
	export let yLabel: string;
</script>

<g id="labels">
	<text
		x={$chartDimensions.width / 2}
		y="{$chartDimensions.height + $chartDimensions.marginBottom / 3} "
		style="font-family: sans-serif; font-size: 14px; font-style: italic; fill: #777;">{xLabel}</text
	>
	<text
		transform="rotate(-90)"
		x={-($chartDimensions.height / 2)}
		y={-$chartDimensions.marginLeft}
		dy="1em"
		text-anchor="middle"
		style="font-family: sans-serif; font-size: 14px; fill: #777;"
	>
		{yLabel}
	</text>
</g>
