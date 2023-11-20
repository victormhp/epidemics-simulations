<script lang="ts">
	import type { ChartResponse } from '$lib/models';
	import { chartResponse } from '$lib/stores';
	import { InputZoom } from './ui';

	const simulations = {
		sir: 'Fast SIR',
		sis: 'Fast SIS'
	};

	const simulationStates = ['S', 'I', 'R'];

	async function generateChart(event: SubmitEvent) {
		const formData = new FormData(event.target as HTMLFormElement);

		// Simulation states
		const states = formData.getAll('state');
		formData.delete('state');

		const data = Object.fromEntries(formData.entries());

		const dataJson = {
			...data,
			states
		};

		try {
			chartResponse.update((state) => ({ ...state, loading: true }));
			const response = await fetch('http://localhost:5000/api/models/', {
				method: 'POST',
				body: JSON.stringify(dataJson),
				headers: { 'Content-type': 'application/json' }
			});

			if (response.ok) {
				const data: ChartResponse = await response.json();

				chartResponse.update((state) => ({
					...state,
					inputs: data.inputs,
					positions: data.positions
				}));
			}
		} catch (error) {
			console.error(error);
		} finally {
			chartResponse.update((state) => ({ ...state, loading: false }));
		}
	}
</script>

<form class="flex flex-col justify-center gap-y-8" on:submit|preventDefault={generateChart}>
	<div>
		<label for="model">Model</label>
		<select
			id="model"
			name="model"
			class="flex h-10 w-full rounded-md border border-input bg-background text-sm px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			required
		>
			{#each Object.entries(simulations) as [value, label]}
				<option {value}>{label}</option>
			{/each}
		</select>
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
		<input id="transmission" name="transmissionRate" type="number" min="0" step="any" required />
	</div>
	<div>
		<label for="recovery">Recovery Rate</label>
		<input id="recovery" name="recoveryRate" type="number" min="0" step="0.001" required />
	</div>
	<div>
		<label for="infected">Transmission Rate</label>
		<input id="infected" name="fractionInfected" type="number" min="0" step="any" required />
	</div>
	<InputZoom />
	<button disabled={$chartResponse.loading} type="submit" class="btn">Generate</button>
</form>
