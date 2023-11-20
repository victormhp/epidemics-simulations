<script lang="ts">
	import { generateChartFromFile } from '$lib/utils';
	import { chartResponse } from '$lib/stores';
	import { FileDropzone, InputZoom } from './ui';

	let simFile: FileList;

	async function generateChartFromSimulationObject(event: SubmitEvent) {
		const url = 'http://localhost:5000/api/sim';
		await generateChartFromFile(event, simFile, url);
	}
</script>

<form
	class="space-y-10"
	enctype="multipart/form-data"
	on:submit|preventDefault={generateChartFromSimulationObject}
>
	<FileDropzone id="simInputs" bind:files={simFile}>
		<span slot="files">Simulation Object file</span>
	</FileDropzone>
	<InputZoom />
	<button disabled={$chartResponse.loading} type="submit" class="btn">Generate</button>
</form>
