<script lang="ts">
	import '$lib/styles/index.css';
</script>

<div class="app grid grid-rows-[min-content,1fr]">
	<header class="h-fit py-1 px-4 border-b border-border shadow-sm">
		<h2 class="text-xl font-semibold p-2">Epidemic Simulations</h2>
	</header>
	<main class="grid grid-cols-1 auto-rows-max gap-x-8 p-8 lg:grid-cols-[1fr_2fr] lg:grid-rows-1">
		<slot />
	</main>
</div>
