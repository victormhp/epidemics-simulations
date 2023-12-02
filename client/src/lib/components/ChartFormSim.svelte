<script lang="ts">
	import { generateChartFromData } from '$lib/utils';
	import { chartResponse } from '$lib/stores';
	import { FileDropzone, InputZoom } from './ui';

	const { MODE } = import.meta.env;

	const simulationStates = ['S', 'I', 'R'];
	let simulationObjectFile: FileList;

	async function generateChartFromSimulationObject(event: SubmitEvent) {
		const url = MODE === 'development' ? 'http://localhost:5000/api/sim' : '/api/sim';

		const addStates = (formData: FormData) => {
			const states = formData.getAll('state');
			formData.delete('state');
			formData.append('states', states.join(''));
		};

		await generateChartFromData(event, url, addStates);
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
	<fieldset>
		<div class="flex gap-x-4">
			<legend class="text-sm">Select states:</legend>
			<div class="flex gap-x-4">
				{#each simulationStates as state}
					<div class="flex gap-x-1 justify-center items-center">
						<input type="checkbox" id={state} name="state" value={state} checked={state === 'I'} />
						<label for={state}>{state}</label>
					</div>
				{/each}
			</div>
		</div>
	</fieldset>
	<InputZoom />
	<button disabled={$chartResponse.loading} type="submit" class="btn">Generate</button>
</form>
