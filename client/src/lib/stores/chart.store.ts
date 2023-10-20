import { writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';
import type { ChartData, ChartInputs, ChartResponse, Dimensions } from '$lib/models';
import { updater } from '$lib/utils';
import * as d3 from 'd3';

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

function createLinesStore(initialValue: ChartLines, onChange?: (value: ChartLines) => void) {
	const lines = writable(initialValue);

	const update = updater(lines, onChange);

	return {
		...lines,
		update
	};
}

export const chartLines = createLinesStore({} as ChartLines);

// Chart scales
interface ChartScales {
	xScale: d3.ScaleLinear<number, number, never>;
	yScale: d3.ScaleLinear<number, number, never>;
}

function createScalesStore(initialValue: ChartScales, onChange?: (value: ChartScales) => void) {
	const scales = writable(initialValue);
	let defaultScales = initialValue;

	const update = updater(scales, onChange);

	const setDefault: typeof scales.set = (curr) => {
		update(() => curr);
		defaultScales = curr;
	};

	const rescale = (zoomState: d3.ZoomTransform) => {
		update(() => {
			return {
				xScale: zoomState.rescaleX(defaultScales.xScale),
				yScale: zoomState.rescaleY(defaultScales.yScale)
			};
		});
	};

	const updateDomain = (data: ChartData[]) => {
		update(() => {
			return {
				xScale: defaultScales.xScale.domain([0, d3.max(data, (d) => d.x) ?? 0]),
				yScale: defaultScales.yScale.domain([0, d3.max(data, (d) => d.y) ?? 0])
			};
		});
	};

	return {
		...scales,
		setDefault,
		rescale,
		updateDomain,
		update
	};
}

export const chartScales = createScalesStore({} as ChartScales);

// Chart actions context
interface ChartActions {
	zoomIn: () => void;
	zoomOut: () => void;
	resetAxis: () => void;
	updateDomain: () => void;
}

function createActionsStore(initialValue: ChartActions, onChange?: (value: ChartActions) => void) {
	const actions = writable(initialValue);

	const update = updater(actions, onChange);

	return {
		...actions,
		update
	};
}

export const chartActions = createActionsStore({} as ChartActions);
