<script lang="ts">
	import { getContext } from 'svelte';

	export let group: any;
	export let name: string;
	export let value: number;
	export let title = '';
	export let controls = '';

	export let active = getContext('active');
	export let hover = getContext('hover');

	let elemInput: HTMLElement;

	function onKeyDown(event: KeyboardEvent): void {
		if (['Enter', 'Space'].includes(event.code)) {
			event.preventDefault();
			elemInput.click();
		} else if (event.code === 'ArrowRight') {
			const tabList = elemInput.closest('.tab-list');
			if (!tabList) return;
			const tabs = Array.from(tabList.querySelectorAll('.tab'));

			const currTab = elemInput.closest('.tab');
			if (!currTab) return;

			const currIndex = tabs.indexOf(currTab);
			const nextIndex = currIndex + 1 >= tabs.length ? 0 : currIndex + 1;
			const nextTab = tabs[nextIndex];
			const nextTabInput = nextTab?.querySelector('input');
			if (nextTab && nextTabInput) {
				nextTabInput.click();
				(nextTab as HTMLElement).focus();
			}
		} else if (event.code === 'ArrowLeft') {
			const tabList = elemInput.closest('.tab-list');
			if (!tabList) return;
			const tabs = Array.from(tabList.querySelectorAll('.tab'));

			const currTab = elemInput.closest('.tab');
			if (!currTab) return;

			const currIndex = tabs.indexOf(currTab);
			const nextIndex = currIndex - 1 < 0 ? tabs.length - 1 : currIndex - 1;
			const nextTab = tabs[nextIndex];
			const nextTabInput = nextTab?.querySelector('input');
			if (nextTab && nextTabInput) {
				nextTabInput.click();
				(nextTab as HTMLElement).focus();
			}
		}
	}

	$: selected = value === group;
	$: classesActive = selected ? active : hover;
</script>

<label
	class="flex justify-center items-center text-center cursor-pointer transition-colors duration-100 flex-1 px-4 py-2 rounded-t-lg {classesActive}"
	{title}
>
	<div
		class="tab rounded-md"
		data-testid="tab"
		role="tab"
		aria-controls={controls}
		aria-selected={selected}
		tabindex={selected ? 0 : -1}
		on:keydown={onKeyDown}
		on:keydown
		on:keyup
		on:keypress
	>
		<div class="h-0 w-0 overflow-hidden">
			<input
				bind:this={elemInput}
				bind:group
				type="radio"
				{name}
				{value}
				tabindex="-1"
				on:click
				on:change
			/>
		</div>
		<div class="tab-interface">
			<div class="tab-label"><slot /></div>
		</div>
	</div>
</label>
