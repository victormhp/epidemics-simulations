<script>
	import { Link } from 'svelte-routing';
	import Icon from '@iconify/svelte';
	import { navMenu, docsMenu } from '$lib/config';

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

<header class="fixed w-full h-fit py-2 px-8 bg-background border-b border-border shadow-sm z-50">
	<nav class="flex justify-between items-center">
		<Link to="/" class="text-xl font-bold p-2">Epidemic Simulations</Link>
		<button
			class="lg:hidden"
			aria-label="Toggle menu"
			aria-expanded={isMenuOpen}
			on:click={openMenu}
		>
			<Icon icon="tabler:menu-2" width="24" height="24" />
		</button>
		{#if isMenuOpen}
			<div
				class="fixed inset-0 flex flex-col justify-between rounded-lg bg-background border border-border shadow-sm p-12 z-50"
			>
				<button class="absolute top-4 right-8" tabindex="0" on:click={closeMenu}>
					<Icon icon="tabler:x" width="24" height="24" />
				</button>
				<ul class="space-y-8">
					<li>
						<Link to="/docs/introduction" class="font-bold text-2xl" on:click={closeMenu}>
							Docs
						</Link>
					</li>
					{#each docsMenu.sections as { title, href, items }}
						<li class="space-y-2">
							<Link to={href} class="font-bold text-xl" on:click={closeMenu}>
								{title}
							</Link>
							<ul class="space-y-1 text-lg">
								{#each items as { title, anchor }}
									<li>
										<a href={anchor} class="w-full ml-4" on:click={closeMenu}>
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
						class="flex gap-2 items-center"
						on:click={closeMenu}
					>
						<Icon icon="tabler:brand-github" width="24" height="24" />
						Github
					</a>
					<a
						href="https://epidemicsonnetworks.readthedocs.io/en/latest/EoN.html"
						target="_blank"
						rel="noopener noreferrer"
						class="flex gap-2 items-center"
						on:click={closeMenu}
					>
						<Icon icon="tabler:package" width="24" height="24" />
						EoN Module
					</a>
				</div>
			</div>
		{/if}
		<ul class="flex gap-8 font-medium max-lg:hidden">
			<li>
				<Link to="/docs/introduction" class="transition-all hover:text-muted-foreground/50">
					Docs
				</Link>
			</li>
			{#each navMenu as { title, href }}
				<li>
					<a
						{href}
						target="_blank"
						rel="noopener noreferrer"
						class="transition-all hover:text-muted-foreground/50"
					>
						{title}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
<slot />
