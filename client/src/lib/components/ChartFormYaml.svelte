<script lang="ts">
	import { generateChartFromData, type UploadedFile } from '$lib/utils';
	import { chartResponse } from '$lib/stores';
	import { FileDropzone, InputZoom } from './ui';

	let graphmlFile: FileList;
	let yamlFile: FileList;

	async function generateChart(event: SubmitEvent) {
		const url = 'http://localhost:5000/api/yaml';
		const uploadedFiles: UploadedFile[] = [
			{ fileList: graphmlFile, fieldName: 'graphml' },
			{ fileList: yamlFile, fieldName: 'yaml' }
		];

		await generateChartFromData(event, url, uploadedFiles);
	}
</script>

<form class="space-y-10" enctype="multipart/form-data" on:submit|preventDefault={generateChart}>
	<FileDropzone id="graphmlInputs" bind:files={graphmlFile} allowedExtensions={'.graphml'}>
		<span slot="files">GraphML file</span>
	</FileDropzone>
	<FileDropzone id="yamlInput" bind:files={yamlFile} allowedExtensions={'.yaml'} required={true}>
		<span slot="files">YAML file</span>
	</FileDropzone>
	<InputZoom />
	<button disabled={$chartResponse.loading} type="submit" class="btn">Generate</button>
</form>
