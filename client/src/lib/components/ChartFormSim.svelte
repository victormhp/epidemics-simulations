<script lang="ts">
	import { generateChartFromData } from '$lib/utils';
	import { chartResponse } from '$lib/stores';
	import { FileDropzone, InputZoom } from './ui';

	let simulationObjectFile: FileList;

	async function generateChartFromSimulationObject(event: SubmitEvent) {
		const url = 'http://localhost:5000/api/sim';
		await generateChartFromData(event, url);
	}
</script>

<form
	class="space-y-10"
	enctype="multipart/form-data"
	on:submit|preventDefault={generateChartFromSimulationObject}
>
	<FileDropzone
		id="simInputs"
		name="simulation_object"
		bind:files={simulationObjectFile}
		required={true}
	>
		<span slot="files">Simulation Investigation Object file</span>
	</FileDropzone>
	<InputZoom />
	<button disabled={$chartResponse.loading} type="submit" class="btn">Generate</button>
</form>
