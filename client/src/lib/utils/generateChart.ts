import type { ChartResponse } from '$lib/models';
import { chartResponse } from '$lib/stores';

function excludeFileInputs(data: FormData) {
	const filteredData = new FormData();

	data.forEach((value, key) => {
		if (!(value instanceof File)) {
			filteredData.append(key, value);
		}
	});

	return filteredData;
}

export async function generateChartFromData(
	event: SubmitEvent,
	url: string,
	modifyFormData?: (formData: FormData) => void
) {
	const formData = new FormData(event.target as HTMLFormElement);

	if (modifyFormData) {
		modifyFormData(formData);
	}

	const filteredFormData = excludeFileInputs(formData);
	const chartData = Object.fromEntries([...filteredFormData]);

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
