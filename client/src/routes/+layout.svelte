<script lang="ts">
	import { Github, Menu } from 'lucide-svelte';
	import '@fontsource/open-sans';
	import '@fontsource/open-sans/500.css';
	import '$lib/styles/index.css';
</script>

<div class="h-full grid grid-rows-[min-content,1fr]">
	<header class="h-fit py-1 px-8 border-b border-border shadow-sm">
		<nav class="flex justify-between items-center">
			<a href="/" class="text-xl font-semibold p-2">Epidemic Simulations</a>
			<div class="sm:hidden"><Menu /></div>
			<ul class="flex gap-8 font-medium max-sm:hidden">
				<li><a href="/" class="transition-all hover:text-muted-foreground/50">Docs</a></li>
				<li>
					<a
						href="https://epidemicsonnetworks.readthedocs.io/en/latest/EoN.html"
						target="_blank"
						rel="noreferrer noopener"
						class="transition-colors hover:text-muted-foreground/70"
					>
						EoN Module
					</a>
				</li>
				<li>
					<div class="h-full w-[1px] bg-muted-foreground/70" />
				</li>
				<li>
					<a
						href="https://github.com/victormhp/epidemics-sveltekit-flask"
						target="_blank"
						rel="noreferrer noopener"
					>
						<Github class="transition-colors hover:text-muted-foreground/70" />
					</a>
				</li>
			</ul>
		</nav>
	</header>
	<main class="grid grid-cols-1 auto-rows-max gap-8 p-8 lg:grid-cols-[2fr_5fr] lg:grid-rows-1">
		<slot />
	</main>
</div>
