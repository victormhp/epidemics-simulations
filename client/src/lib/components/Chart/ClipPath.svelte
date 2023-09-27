<script lang="ts">
	import { getChartConfig } from '$lib/stores';

	export let id: string;

	const chartConfig = getChartConfig();
	$: dimensions = $chartConfig.dimensions;
</script>

<defs>
	<clipPath {id}>
		<rect width={dimensions.width} height={dimensions.height} />
	</clipPath>
</defs>
