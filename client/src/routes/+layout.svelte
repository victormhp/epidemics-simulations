<script lang="ts">
	import { Github, Package, Menu, X } from 'lucide-svelte';
	import { navMenu, docsMenu } from '$lib/config';
	import { getHash } from '$lib/utils';
	import { page } from '$app/stores';
	import '$lib/styles/index.css';

	let isMenuOpen = false;

	const openMenu = () => (isMenuOpen = true);
	const closeMenu = () => (isMenuOpen = false);
</script>

<svelte:head>
	{#if isMenuOpen}
		<style>
			body {
				overflow: hidden;
			}
		</style>
	{/if}
</svelte:head>

<div class="min-h-screen xl:flex">
	<header class="fixed w-full h-fit py-2 px-8 bg-background border-b border-border shadow-sm z-50">
		<nav class="flex justify-between items-center">
			<a href="/" class="text-xl font-semibold p-2">Epidemic Simulations</a>
			<button
				class="lg:hidden"
				aria-label="Toggle menu"
				aria-expanded={isMenuOpen}
				on:click={openMenu}
			>
				<Menu />
			</button>
			{#if isMenuOpen}
				<div
					class="fixed inset-0 flex flex-col justify-between rounded-lg bg-background border border-border shadow-sm p-12 z-50"
				>
					<button class="absolute top-4 right-8" tabindex="0" on:click={closeMenu}>
						<X />
					</button>
					<ul class="space-y-8 pt-28">
						<li>
							<a href="/docs/introduction" class="font-semibold text-2xl" on:click={closeMenu}>
								Docs
							</a>
						</li>
						{#each docsMenu.sections as { title, items }}
							<li class="space-y-2">
								<span class="font-semibold text-xl">
									{title}
								</span>
								<ul class="space-y-1 text-lg">
									{#each items as { title, href }}
										<li class:active={$page.url.hash === getHash(href)}>
											<a {href} class="w-full ml-4" on:click={closeMenu}>
												{title}
											</a>
										</li>
									{/each}
								</ul>
							</li>
						{/each}
					</ul>
					<div class="w-full flex justify-around text-xl">
						<a
							href="https://github.com/victormhp/epidemics-sveltekit-flask"
							target="_blank"
							rel="noopener noreferrer"
							class="flex gap-2"
							on:click={closeMenu}
						>
							<Github />
							Github
						</a>
						<a
							href="https://epidemicsonnetworks.readthedocs.io/en/latest/EoN.html"
							target="_blank"
							rel="noopener noreferrer"
							class="flex gap-2"
							on:click={closeMenu}
						>
							<Package />
							EoN Module
						</a>
					</div>
				</div>
			{/if}
			<ul class="flex gap-8 font-medium max-lg:hidden">
				{#each navMenu as { title, href, openInNewTab }}
					<li>
						<a
							{href}
							target={openInNewTab ? '_blank' : ''}
							rel={openInNewTab ? 'noopener noreferrer' : ''}
							class="transition-all hover:text-muted-foreground/50"
							on:click={closeMenu}
						>
							{title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</header>
	<slot />
</div>

<style>
	.active {
		@apply rounded bg-muted border border-border;
	}
</style>
