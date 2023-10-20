import { writable, type Updater } from 'svelte/store';
import { getContext, setContext } from 'svelte';
import type { ChartData, ChartInputs, ChartResponse, Dimensions } from '$lib/models';
import type { ScaleLinear, ZoomTransform } from 'd3';

// Chart fetch response
const initialChartResponse: ChartResponse = {
	loading: false,
	positions: {} as ChartData[],
	inputs: {} as ChartInputs
};

export const chartResponse = writable<ChartResponse>(initialChartResponse);

// Chart dimensions
export const chartDimensions = writable<Dimensions>();

// Chart legends context
export function setLegend(legend: string[]) {
	setContext('legend', legend);
}

export function getLegend() {
	return getContext<string[]>('legend');
}

// Chart Lines
type Line = [string, ChartData[]];

interface ChartLines {
	lines: Line[];
	linesDisplayed: Map<string, boolean>;
}

function createLinesStore(initialScales: ChartLines, onChange?: (value: ChartLines) => void) {
	const lines = writable(initialScales);

	const update = (updater: Updater<ChartLines>) => {
		lines.update((current) => {
			const newLines = updater(current);

			if (newLines !== current) {
				onChange?.(newLines);
			}

			return newLines;
		});
	};

	return {
		...lines,
		update
	};
}

export const chartLines = createLinesStore({} as ChartLines);

// Chart scales
interface ChartScales {
	xScale: ScaleLinear<number, number, never>;
	yScale: ScaleLinear<number, number, never>;
}

function createScalesStore(initialScales: ChartScales, onChange?: (value: ChartScales) => void) {
	const scales = writable(initialScales);
	let defaultScales = initialScales;

	const update = (updater: Updater<ChartScales>) => {
		scales.update((current) => {
			const newScales = updater(current);

			if (newScales !== current) {
				onChange?.(newScales);
			}

			return newScales;
		});
	};

	const setDefault: typeof scales.set = (curr) => {
		update(() => curr);
		defaultScales = curr;
	};

	const rescale = (zoomState: ZoomTransform) => {
		update(() => {
			return {
				xScale: zoomState.rescaleX(defaultScales.xScale),
				yScale: zoomState.rescaleY(defaultScales.yScale)
			};
		});
	};

	return {
		...scales,
		rescale,
		update,
		setDefault
	};
}

export const chartScales = createScalesStore({} as ChartScales);

// Chart actions context
interface ChartActions {
	zoomIn: () => void;
	zoomOut: () => void;
	resetAxis: () => void;
}

export const chartActions = writable<ChartActions>();
