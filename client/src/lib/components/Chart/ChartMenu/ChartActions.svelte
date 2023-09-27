<script lang="ts">
	import { MoreVertical, RotateCcw, ZoomIn, ZoomOut } from 'lucide-svelte';
	import { chartActions } from '$lib/stores';

	export let toggleMenu: () => void;

	const { resetAxis, zoomIn, zoomOut } = $chartActions;
</script>

<div class=" flex flex-col justify-center gap-y-2">
	<button class="btn-icon" on:click={toggleMenu}>
		<MoreVertical color="#71717a" size="20" />
	</button>
	<button class="btn-icon" on:click={resetAxis}>
		<RotateCcw color="#71717a" size="20" />
	</button>
	<button class="btn-icon" on:click={zoomIn}>
		<ZoomIn color="#71717a" size="20" />
	</button>
	<button class="btn-icon" on:click={zoomOut}>
		<ZoomOut color="#71717a" size="20" />
	</button>
</div>
