import type { ScaleLinear } from 'd3';

export interface Dimensions {
	width: number;
	height: number;
	marginTop: number;
	marginLeft: number;
	marginBottom: number;
	marginRight: number;
}

export interface ChartInputs {
	model: string;
	transmissionRate: string;
	recoveryRate: string;
	fractionInfected: string;
	zoom?: string;
}

export interface ChartConfig {
	dimensions: Dimensions;
	xScale: ScaleLinear<number, number, never>;
	yScale: ScaleLinear<number, number, never>;
	legends: string[];
	linesDisplayed: Map<string, boolean>;
}

export interface ChartActions {
	zoomIn: () => void;
	zoomOut: () => void;
	resetAxis: () => void;
}

export interface Point {
	x: number;
	y: number;
}

export interface ChartData extends Point {
	strategy: string;
}

export interface ChartResponse {
	loading: boolean;
	positions: ChartData[];
	inputs: ChartInputs;
}

export type LineGenerator<T> = (
	linedata: T[],
	x: d3.ScaleLinear<number, number, never>,
	y: d3.ScaleLinear<number, number, never>
) => string;
