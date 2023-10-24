export function formatFileSize(bytes: number) {
	if (bytes == 0) return '0 Bytes';

	const k = 1000,
		sizes = ['Bytes', 'KB', 'MB', 'GB'],
		i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}