import type { ChartResponse } from '$lib/models';
import { chartResponse } from '$lib/stores';

export interface UploadedFile {
	fileList: FileList;
	fieldName: string;
}

function appendFile(formData: FormData, file: UploadedFile) {
	if (file.fileList?.[0]) {
		formData.append(file.fieldName, file.fileList[0]);
	}
}

export async function generateChartFromData(
	event: SubmitEvent,
	url: string,
	files?: UploadedFile[],
	modifyFormData?: (formData: FormData) => void
) {
	const formData = new FormData(event.target as HTMLFormElement);

	if (modifyFormData) {
		modifyFormData(formData);
	}

	if (files) {
		for (const file of files) {
			if (file.fileList) {
				appendFile(formData, file);
			}
		}
	}

	try {
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
		// Always update loading state
		chartResponse.update((state) => ({ ...state, loading: false }));
	}
}
