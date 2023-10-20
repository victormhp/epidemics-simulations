import type { ChartData, LineGenerator } from '$lib/models';
import * as d3 from 'd3';

export const lineGenerator: LineGenerator<ChartData> = (linedata, x, y): string =>
	d3
		.line<ChartData>()
		.x((d) => x(d.x))
		.y((d) => y(d.y))(linedata) ?? '';
