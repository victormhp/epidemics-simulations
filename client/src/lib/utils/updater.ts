import type { Updater, Writable } from 'svelte/store';

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
