<script lang="ts">
	import type { ChartResponse } from '$lib/models';
	import { chartResponse } from '$lib/stores';

	async function generateChart(event: SubmitEvent) {
		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData.entries());

		try {
			chartResponse.update((state) => ({ ...state, loading: true }));
			const response = await fetch('http://localhost:5000/api/models/', {
				method: 'POST',
				body: JSON.stringify(data),
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
			<option value="sir">Fast SIR</option>
			<option value="sis">Fast SIS</option>
		</select>
	</div>
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
	<button disabled={$chartResponse.loading} type="submit" class="btn">Generate</button>
</form>
