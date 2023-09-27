export function clickOutside(node: HTMLElement) {
	let clickTimer: number;

	const handleClick = (event: MouseEvent) => {
		clearTimeout(clickTimer);

		clickTimer = setTimeout(() => {
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
