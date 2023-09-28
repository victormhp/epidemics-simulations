<script lang="ts">
	import { Upload } from 'lucide-svelte';

	export let allowedExtensions: string;
	export let files: FileList | undefined = undefined;
</script>

<div class="flex flex-col items-center justify-center w-full">
	<label
		for="dropzone-file"
		class="flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/50 transition-colors"
	>
		<div class="flex flex-col items-center justify-center pt-5 pb-6">
			<Upload size="32" color="#71717a" />
			<p class="my-2 text-sm text-muted-foreground">
				<span class="font-semibold">Click to upload</span> or drag and drop
			</p>
			<p class="text-xs text-muted-foreground">
				{#if files && files[0]}
					{#each Array.from(files) as file}
						{file.name} ({file.size} bytes)
					{/each}
				{:else}
					<slot name="files" />
				{/if}
			</p>
		</div>
		<input
			id="dropzone-file"
			name="file-chart"
			bind:files
			type="file"
			accept={allowedExtensions}
			class="hidden"
			required
		/>
	</label>
</div>
