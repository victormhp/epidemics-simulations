<script lang="ts">
	import Icon from '@iconify/svelte';
	import { chartActions, chartResponse } from '$lib/stores';

	export let toggleMenu: () => void;

	const { resetAxis, zoomIn, zoomOut } = $chartActions;
	const isZoomEnable = $chartResponse.inputs.zoom;
</script>

<div class="flex gap-y-2 sm:flex-col lg:justify-center">
	<button class="btn-icon" on:click={toggleMenu}>
		<Icon icon="tabler:dots-vertical" color="#71717a" width="24" height="24" />
	</button>
	{#if isZoomEnable}
		<button class="btn-icon" on:click={resetAxis}>
			<Icon icon="tabler:reload" color="#71717a" width="24" height="24" />
		</button>
		<button class="btn-icon" on:click={zoomIn}>
			<Icon icon="tabler:zoom-in" color="#71717a" width="24" height="24" />
		</button>
		<button class="btn-icon" on:click={zoomOut}>
			<Icon icon="tabler:zoom-out" color="#71717a" width="24" height="24" />
		</button>
	{/if}
</div>
