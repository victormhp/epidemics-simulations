<script lang="ts">
	import { MoreVertical, RotateCcw, ZoomIn, ZoomOut } from 'lucide-svelte';
	import { chartActions, chartResponse } from '$lib/stores';

	export let toggleMenu: () => void;

	const { resetAxis, zoomIn, zoomOut } = $chartActions;
	const isZoomEnable = $chartResponse.inputs.zoom;
</script>

<div class="flex gap-y-2 sm:flex-col lg:justify-center">
	<button class="btn-icon" on:click={toggleMenu}>
		<MoreVertical color="#71717a" size="20" />
	</button>
	{#if isZoomEnable}
		<button class="btn-icon" on:click={resetAxis}>
			<RotateCcw color="#71717a" size="20" />
		</button>
		<button class="btn-icon" on:click={zoomIn}>
			<ZoomIn color="#71717a" size="20" />
		</button>
		<button class="btn-icon" on:click={zoomOut}>
			<ZoomOut color="#71717a" size="20" />
		</button>
	{/if}
</div>
