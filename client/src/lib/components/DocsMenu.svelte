<script lang="ts">
	import { Link } from 'svelte-routing';
	import { docsMenu } from '$lib/config';
</script>

<aside
	class="fixed w-[min(25rem,30vw)] h-full left-0 bg-muted/50 overflow-x-hidden overflow-y-auto hidden border-r-2 border-muted lg:block"
>
	<nav class="h-[calc(100vh-4rem)] overflow-x-hidden overflow-y-auto">
		<ul class="space-y-12 text-muted-foreground ml-auto px-0 pl-28 py-28">
			{#each docsMenu.sections as { title, href, items }}
				<li class="space-y-2">
					<Link to={href} class="font-bold text-foreground tracking-wider uppercase">
						{title}
					</Link>
					<ul class="space-y-2 border-l border-muted-foreground">
						{#each items as { title, anchor }}
							<li>
								<a
									href={anchor}
									class="border-l border-muted-foreground pl-4 -ml-px hover:text-foreground hover:border-foreground"
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
