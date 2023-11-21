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

export interface ChartData {
	strategy: string;
	x: number;
	y: number;
}

export type Line = [string, ChartData[]];

export interface ChartLines {
	lines: Line[];
	linesDisplayed: Map<string, boolean>;
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
