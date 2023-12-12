<script lang="ts">
	import { Copy, CopyCheck } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	let copyButton: HTMLButtonElement;
	let copying = false;

	async function copy() {
		try {
			const preTagSibling = copyButton.nextElementSibling as HTMLPreElement;
			const code = preTagSibling.innerText;

			await navigator.clipboard.writeText(code);
		} catch {
			/**
			 * This is the fallback deprecated way of copying text to the clipboard. Only runs if it can't find the clipboard API.
			 * Taken from https://github.com/ghostdevv/svelte-copy/blob/main/src/lib/copy.ts
			 */
			const preTagSibling = copyButton.nextElementSibling as HTMLPreElement;
			const code = preTagSibling.innerText;

			const element = document.createElement('input');

			element.type = 'text';
			element.disabled = true;

			element.style.cssText = `position: fixed;z-index: -100;pointer-events: none;opacity: 0;`;

			element.value = code;

			document.body.appendChild(element);

			element.click();
			element.select();
			document.execCommand('copy');

			document.body.removeChild(element);
		} finally {
			copying = true;

			setTimeout(() => {
				copying = false;
			}, 1000);
		}
	}
</script>

<button
	bind:this={copyButton}
	id="copy-to-clipboard-button"
	class="absolute top-3 right-3 grid place-items-center grid-cols-[1fr] grid-rows-[1fr] transition-opacity overflow-hidden hover:opacity-75"
	on:click={copy}
>
	{#if copying}
		<span
			class="col-[1/span_1] row-[1/span_1]"
			transition:fade={{ easing: cubicOut, duration: 400 }}
		>
			<CopyCheck color="#71717a" />
		</span>
	{:else}
		<span
			class="col-[1/span_1] row-[1/span_1]"
			transition:fade={{ easing: cubicOut, duration: 400 }}
		>
			<Copy color="#71717a" />
		</span>
	{/if}
</button>
