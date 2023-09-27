<script lang="ts">
	import type { ChartData, ChartResponse, ChartInputs } from '$lib/models';
	import EpidemicsChart from '$lib/components/EpidemicsChart.svelte';
	import { fade } from 'svelte/transition';
	import { Loader2 } from 'lucide-svelte';

	let loading = false;
	let chartData: ChartData[];
	let chartValues: ChartInputs = {
		model: '',
		transmissionRate: '',
		recoveryRate: '',
		fractionInfected: ''
	};

	async function fetchChart() {
		try {
			loading = true;
			const response = await fetch('http://localhost:5000/api/models', {
				method: 'POST',
				body: JSON.stringify(chartValues),
				headers: { 'Content-type': 'application/json' }
			});

			if (response.ok) {
				const data: ChartResponse = await response.json();
				chartData = data.positions;
			}
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}
</script>

<section class="space-y-8">
	<form on:submit={fetchChart} class="flex flex-col justify-center gap-y-8">
		<div>
			<label for="model">Model</label>
			<select
				id="model"
				name="model"
				bind:value={chartValues.model}
				class="flex h-10 w-full rounded-md border border-input bg-background text-sm px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			>
				<option value="sir">Fast SIR</option>
				<option value="sis">Fast SIS</option>
			</select>
		</div>
		<div>
			<label for="transmission">Transmission Rate</label>
			<input id="transmission" name="transmissionRate" bind:value={chartValues.transmissionRate} />
		</div>
		<div>
			<label for="recovery">Recovery Rate</label>
			<input id="recovery" name="recoveryRate" bind:value={chartValues.recoveryRate} />
		</div>
		<div>
			<label for="infected">Transmission Rate</label>
			<input id="infected" name="fractionInfected" bind:value={chartValues.fractionInfected} />
		</div>
		<button type="submit" class="btn">Submit</button>
	</form>
</section>
<section
	class="flex justify-center items-center grow px-4 py-8 rounded-lg border border-border shadow"
>
	{#if loading}
		<div in:fade>
			<Loader2 class="h-16 w-16 animate-spin opacity-20" />
		</div>
	{:else if chartData}
		<EpidemicsChart chartInputs={chartValues} {chartData} />
	{/if}
</section>
