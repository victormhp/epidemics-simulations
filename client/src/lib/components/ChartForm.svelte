<script lang="ts">
	import { generateChartFromData } from '$lib/utils';
	import { chartResponse } from '$lib/stores';
	import { InputZoom } from './ui';

	const { MODE } = import.meta.env;

	const epidemicAlgorithms = {
		eventBased: 'Event Based',
		gillespie: 'Gillespie',
		discreteTime: 'Discrete Time'
	};

	let algorithm: keyof typeof epidemicAlgorithms = 'eventBased';

	const simulations = {
		eventBased: {
			fastSIR: 'Fast SIR',
			fastSIS: 'Fast SIS',
			fastNonMarkovSIR: 'Fast NonMarkov SIR',
			fastNonMarkovSIS: 'Fast NonMarkov SIS'
		},
		gillespie: {
			gillespieSIR: 'Gillespie SIR',
			gillespieSIS: 'Gillespie SIS'
		},
		discreteTime: {
			basicDiscreteSIR: 'Basic Discrete SIR',
			basicDiscreteSIS: 'Basic Discrete SIS',
			discreteSIR: 'Discrete SIR'
		}
	};

	const simulationStates = ['S', 'I', 'R'];

	async function generateChart(event: SubmitEvent) {
		const url = MODE === 'development' ? 'http://localhost:5000/api/form' : '/api/form';

		const addStates = (formData: FormData) => {
			const states = formData.getAll('state');
			formData.delete('state');
			formData.append('states', states.join(''));
		};

		await generateChartFromData(event, url, addStates);
	}
</script>

<form class="flex flex-col justify-center gap-y-8" on:submit|preventDefault={generateChart}>
	<div>
		<label for="graphml">Upload GraphML</label>
		<input id="graphml" name="graphml" type="file" accept={'.graphml'} />
		<p class="mt-1 ml-1 text-xs text-primary/50 select-none">GraphML to define your network.</p>
	</div>
	<div class="flex gap-8 justify-between">
		<div class="w-full">
			<label for="algorithm">Algorithm</label>
			<select
				bind:value={algorithm}
				id="algorithm"
				name="algorithm"
				class="flex h-10 w-full rounded-md border border-input bg-background text-sm px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				required
			>
				{#each Object.entries(epidemicAlgorithms) as [value, label]}
					<option {value}>{label}</option>
				{/each}
			</select>
		</div>
		<div class="w-full">
			<label for="model">Model</label>
			<select
				id="model"
				name="model"
				class="flex h-10 w-full rounded-md border border-input bg-background text-sm px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				required
			>
				{#each Object.entries(simulations[algorithm]) as [value, label]}
					<option {value}>{label}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="w-full">
		<label for="iterations">Iterations</label>
		<input id="iterations" name="iterations" type="number" min="0" step="1" required />
	</div>
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
	<div>
		<label for="transmission">Transmission Rate</label>
		<input id="transmission" name="tau" type="number" min="0" step="any" required />
	</div>
	<div>
		<label for="recovery">Recovery Rate</label>
		<input id="recovery" name="gamma" type="number" min="0" step="0.001" required />
	</div>
	<div>
		<label for="infected">Fraction initially infected</label>
		<input id="infected" name="rho" type="number" min="0" step="any" required />
	</div>
	<InputZoom />
	<button disabled={$chartResponse.loading} type="submit" class="btn">Generate</button>
</form>
