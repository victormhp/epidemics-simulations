<script lang="ts">
	import { generateChartFromData } from '$lib/utils';
	import { chartResponse } from '$lib/stores';
	import { FileDropzone, InputZoom } from './ui';

	const { MODE } = import.meta.env;

	let graphmlFile: FileList;
	let yamlFile: FileList;

	async function generateChart(event: SubmitEvent) {
		const url = MODE === 'development' ? 'http://localhost:8997/api/yaml' : '/api/yaml';
		await generateChartFromData(event, url);
	}
</script>

<form class="space-y-10" enctype="multipart/form-data" on:submit|preventDefault={generateChart}>
	<FileDropzone
		id="graphmlInputs"
		name="graphml"
		bind:files={graphmlFile}
		allowedExtensions={'.graphml'}
	>
		<span slot="files">GraphML file</span>
	</FileDropzone>
	<FileDropzone
		id="yamlInput"
		name="yaml"
		bind:files={yamlFile}
		allowedExtensions={'.yaml'}
		required={true}
	>
		<span slot="files">YAML file</span>
	</FileDropzone>
	<InputZoom />
	<button disabled={$chartResponse.loading} type="submit" class="btn">Generate</button>
</form>
