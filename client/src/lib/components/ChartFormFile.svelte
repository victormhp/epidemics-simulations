<script lang="ts">
	import FileDropzone from './ui/FileDropzone.svelte';
	import type { ChartResponse } from '$lib/models';
	import { chartResponse } from '$lib/stores';

	let files: FileList;

	async function generateChartFromYaml() {
		try {
			const formData = new FormData();
			if (files && files[0]) {
				formData.append('file', files[0]);
			}

			chartResponse.update((state) => ({ ...state, loading: true }));
			const response = await fetch('http://localhost:5000/api/yaml', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const data: Omit<ChartResponse, 'loading'> = await response.json();

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
</script>

<aside class="space-y-10">
	<form class="space-y-10" on:submit|preventDefault={generateChartFromYaml}>
		<FileDropzone bind:files allowedExtensions={'.yaml'}>
			<span slot="files">YAML file</span>
		</FileDropzone>
		<button type="submit" class="btn">Generate</button>
	</form>
</aside>
