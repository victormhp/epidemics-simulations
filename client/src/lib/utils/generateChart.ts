import type { ChartResponse } from '$lib/models';
import { chartResponse } from '$lib/stores';

export async function generateChartFromData(event: SubmitEvent, url: string) {
	const formData = new FormData(event.target as HTMLFormElement);

	// Simulation states
	const states = formData.getAll('state');
	formData.delete('state');

	const data = Object.fromEntries(formData.entries());

	const dataJson = {
		...data,
		states
	};

	try {
		chartResponse.update((state) => ({ ...state, loading: true }));
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(dataJson),
			headers: { 'Content-type': 'application/json' }
		});

		if (response.ok) {
			const data: ChartResponse = await response.json();

			chartResponse.update((state) => ({
				...state,
				inputs: data.inputs,
				positions: data.positions
			}));
		}
	} catch (error) {
		console.error(error);
	} finally {
		chartResponse.update((state) => ({ ...state, loading: false }));
	}
}

export async function generateChartFromFile(event: SubmitEvent, files: FileList, url: string) {
	try {
		const formData = new FormData(event.target as HTMLFormElement);
		if (files && files[0]) {
			formData.append('file', files[0]);
		}

		chartResponse.update((state) => ({ ...state, loading: true }));
		const response = await fetch(url, {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			const data: ChartResponse = await response.json();
			console.log(data);

			chartResponse.update((state) => ({
				...state,
				inputs: data.inputs,
				positions: data.positions
			}));
		} else {
			console.error('HTTP error:', response.status, response.statusText);
		}
	} catch (error) {
		console.error(error);
	} finally {
		chartResponse.update((state) => ({ ...state, loading: false }));
	}
}
