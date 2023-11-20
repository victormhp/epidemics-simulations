<script lang="ts">
	import { generateChartFromFile } from '$lib/utils';
	import { chartResponse } from '$lib/stores';
	import { FileDropzone, InputZoom } from './ui';

	let yamlFile: FileList;

	async function generateChartFromYaml(event: SubmitEvent) {
		const url = 'http://localhost:5000/api/yaml';
		await generateChartFromFile(event, yamlFile, url);
	}
</script>

<form
	class="space-y-10"
	enctype="multipart/form-data"
	on:submit|preventDefault={generateChartFromYaml}
>
	<FileDropzone id="yamlInput" bind:files={yamlFile} allowedExtensions={'.yaml'}>
		<span slot="files">YAML file</span>
	</FileDropzone>
	<InputZoom />
	<button disabled={$chartResponse.loading} type="submit" class="btn">Generate</button>
</form>
