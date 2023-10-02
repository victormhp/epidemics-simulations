<script lang="ts">
	import FileDropzone from './ui/FileDropzone.svelte';
	import type { ChartInputs, ChartResponse } from '$lib/models';
	import { chartResponse } from '$lib/stores';

	let yamlFile: FileList;
	let simFile: FileList;

	async function generateChartFromFile(files: FileList, url: string, inputsOverride?: ChartInputs) {
		try {
			const formData = new FormData();
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

				chartResponse.update((state) => ({
					...state,
					inputs: inputsOverride || data.inputs,
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

	async function generateChartFromYaml() {
		const url = 'http://localhost:5000/api/yaml';
		await generateChartFromFile(yamlFile, url);
	}

	async function generateChartFromSimulationObject() {
		const url = 'http://localhost:5000/api/sim';
		await generateChartFromFile(simFile, url, {} as ChartInputs);
	}
</script>

<div class="space-y-10">
	<form
		class="space-y-10"
		enctype="multipart/form-data"
		on:submit|preventDefault={generateChartFromYaml}
	>
		<FileDropzone id="yamlInput" bind:files={yamlFile} allowedExtensions={'.yaml'}>
			<span slot="files">YAML file</span>
		</FileDropzone>
		<button type="submit" class="btn">Generate</button>
	</form>
	<form
		class="space-y-10"
		enctype="multipart/form-data"
		on:submit|preventDefault={generateChartFromSimulationObject}
	>
		<FileDropzone id="simInputs" bind:files={simFile}>
			<span slot="files">YAML file</span>
		</FileDropzone>
		<button type="submit" class="btn">Generate</button>
	</form>
</div>
