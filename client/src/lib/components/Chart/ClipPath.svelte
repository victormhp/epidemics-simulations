<script lang="ts">
	import { chartDimensions } from '$lib/stores';

	export let id: string;
</script>

<defs>
	<clipPath {id}>
		<rect width={$chartDimensions.width} height={$chartDimensions.height} />
	</clipPath>
</defs>
