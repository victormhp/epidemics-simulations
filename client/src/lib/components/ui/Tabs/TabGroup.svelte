<script lang="ts">
	import { setContext } from 'svelte';

	export let labelledby = '';
	export let panel = '';
	export let active = 'border-b-2 border-foreground';
	export let hover = 'hover:bg-muted';

	setContext('active', active);
	setContext('hover', hover);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="tab-group space-y-4" data-testid="tab-group" on:click on:keypress on:keydown on:keyup>
	<!-- Tab List -->
	<div
		class="tab-list flex overflow-x-auto hide-scrollbar justify-start border-b border-border"
		role="tablist"
		aria-labelledby={labelledby}
	>
		<slot />
	</div>
	<!-- Tab Panel -->
	{#if $$slots.panel}
		<div class="tab-panel rounded-md" role="tabpanel" aria-labelledby={panel} tabindex="0">
			<slot name="panel" />
		</div>
	{/if}
</div>
