import type { ChartResponse } from '$lib/models';
import { chartResponse } from '$lib/stores';

export async function generateChartFromData(
	event: SubmitEvent,
	url: string,
	modifyFormData?: (formData: FormData) => void
) {
	const formData = new FormData(event.target as HTMLFormElement);

	if (modifyFormData) {
		modifyFormData(formData);
	}

	const chartData = Object.fromEntries([...formData]);

	try {
		chartResponse.update((state) => ({ ...state, loading: true }));
		const response = await fetch(url, {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			const data: ChartResponse = await response.json();

			chartResponse.update((state) => ({
				...state,
				inputs: chartData,
				positions: data.positions
			}));
		} else {
			console.error('HTTP error:', response.status, response.statusText);
		}
	} catch (error) {
		console.error(error);
	} finally {
		// Always update loading state
		chartResponse.update((state) => ({ ...state, loading: false }));
	}
}
