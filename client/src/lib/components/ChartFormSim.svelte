<script lang="ts">
	import { generateChartFromData, type UploadedFile } from '$lib/utils';
	import { chartResponse } from '$lib/stores';
	import { FileDropzone, InputZoom } from './ui';

	let simulationObjectFile: FileList;

	async function generateChartFromSimulationObject(event: SubmitEvent) {
		const url = 'http://localhost:5000/api/sim';
		const uploadedFiles: UploadedFile[] = [
			{
				fileList: simulationObjectFile,
				fieldName: 'simulation_object'
			}
		];

		await generateChartFromData(event, url, uploadedFiles);
	}
</script>

<form
	class="space-y-10"
	enctype="multipart/form-data"
	on:submit|preventDefault={generateChartFromSimulationObject}
>
	<FileDropzone id="simInputs" bind:files={simulationObjectFile} required={true}>
		<span slot="files">Simulation Investigation Object file</span>
	</FileDropzone>
	<InputZoom />
	<button disabled={$chartResponse.loading} type="submit" class="btn">Generate</button>
</form>
