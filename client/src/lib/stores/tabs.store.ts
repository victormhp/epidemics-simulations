import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

// Selected tab
export function setSelectedTab(initialValue: string) {
	const tab = writable(initialValue);
	setContext('selectedTab', tab);
}

export function getSelectedTab() {
	return getContext<Writable<string>>('selectedTab');
}

// Set tab titles
interface TabTitlesContext {
	registerTab: (id: string, title: string) => void;
	updateTitle: (id: string, title: string) => void;
	unregisterTab: (id: string) => void;
}

export function setTabTitles(initialValue: Record<string, string>[]) {
	const titles = writable(initialValue);

	setContext('tabTitles', {
		registerTab(id: string, title: string) {
			titles.update((currentTitles) => [...currentTitles, { id, title }]);
		},
		updateTitle(id: string, title: string) {
			titles.update((currentTitles) => {
				const tabIndex = currentTitles.findIndex((tab) => tab.id === id);
				if (tabIndex !== -1) {
					const updatedTitles = [...currentTitles];
					updatedTitles[tabIndex] = { id, title };
					return updatedTitles;
				}
				return currentTitles;
			});
		},
		unregisterTab(id: string) {
			titles.update((currentTitles) => currentTitles.filter((tab) => tab.id !== id));
		}
	});

	return {
		...titles
	};
}

export function getTabTitles() {
	return getContext<TabTitlesContext>('tabTitles');
}
