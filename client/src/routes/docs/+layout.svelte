<script lang="ts">
	import { docsMenu } from '$lib/config';
	import { page } from '$app/stores';
</script>

<main class="w-full mx-auto flex flex-col px-8 gap-8 sm:flex-row">
	<aside
		class="fixed bg-muted/50 left-0 h-[calc(100vh-4rem)] w-[min(25rem,30vw)] overflow-x-hidden overflow-y-auto hidden border-r-2 border-muted lg:block"
	>
		<nav class="h-[calc(100vh-4rem)] overflow-x-hidden overflow-y-auto">
			<ul class="space-y-12 text-muted-foreground ml-auto px-0 pl-28 py-16">
				{#each docsMenu.sections as { title, items }}
					<li class="space-y-2">
						<span class="font-semibold text-foreground tracking-wider uppercase">
							{title}
						</span>
						<ul class="space-y-2 border-l border-muted-foreground">
							{#each items as { title, link, hash }}
								<li>
									<a
										href={link}
										class="border-l border-muted-foreground pl-4 -ml-px hover:text-foreground hover:border-foreground"
										class:active={$page.url.hash === hash}
									>
										{title}
									</a>
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
	<slot />
</main>

<style>
	.active {
		@apply text-foreground border-foreground;
	}
</style>
