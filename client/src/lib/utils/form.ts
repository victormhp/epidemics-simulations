import type { ChartInputs } from '$lib/models';

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
