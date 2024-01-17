import type { ChartData, LineGenerator } from '$lib/models';
import type { Updater, Writable } from 'svelte/store';
import * as d3 from 'd3';

export function clickOutside(node: HTMLElement) {
	let clickTimer: number;

	const handleClick = (event: MouseEvent) => {
		clearTimeout(clickTimer);

		clickTimer = window.setTimeout(() => {
			if (node && !node.contains(event.target as Node)) {
				node.dispatchEvent(new CustomEvent('outclick', { detail: node }));
			}
		}, 10);
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

export const matchSimulation = (name: string) => name.match(/Simulation ([A-Z]) - (\d+)/);

export function formatFileSize(bytes: number) {
	if (bytes == 0) return '0 Bytes';

	const k = 1000,
		sizes = ['Bytes', 'KB', 'MB', 'GB'],
		i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export const lineGenerator: LineGenerator<ChartData> = (linedata, x, y): string =>
	d3
		.line<ChartData>()
		.x((d) => x(d.x))
		.y((d) => y(d.y))(linedata) ?? '';

export function updater<T>(store: Writable<T>, onChange?: (value: T) => void) {
	return (updater: Updater<T>) => {
		store.update((current) => {
			const newValue = updater(current);

			if (newValue !== current) {
				onChange?.(newValue);
			}

			return newValue;
		});
	};
}
