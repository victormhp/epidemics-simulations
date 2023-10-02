import type { ChartInputs } from '$lib/models';

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

export function formJsonToYaml(data: ChartInputs): string {
	return Object.entries(data)
		.map(([key, value]) => `${key}: ${value}`)
		.join('\n');
}

export function formatFileSize(bytes: number) {
	if (bytes == 0) return '0 Bytes';

	const k = 1000,
		sizes = ['Bytes', 'KB', 'MB', 'GB'],
		i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
