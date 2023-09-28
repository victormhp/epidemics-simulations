import type { ChartData, ChartInputs, LineGenerator } from '../models/chart.model';
import * as d3 from 'd3';
import { formJsonToYaml } from './common.utils';

export const lineGenerator: LineGenerator<ChartData> = (linedata, x, y): string =>
	d3
		.line<ChartData>()
		.x((d) => x(d.x))
		.y((d) => y(d.y))(linedata) ?? '';

export const downloadChartPNG = (svgSelector: string) => {
	const svg = document.querySelector<SVGElement>(svgSelector);
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	if (!svg || !context) {
		console.error('SVG or canvas context not found.');
		return;
	}

	canvas.width = svg.clientWidth;
	canvas.height = svg.clientHeight;

	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, canvas.height);

	const image = new Image();
	image.src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(svg));
	image.onload = () => {
		context.drawImage(image, 0, 0);

		const href = canvas.toDataURL('image/png');
		const a = Object.assign(document.createElement('a'), {
			href,
			style: 'display: none',
			download: 'chart.png'
		});

		a.click();
		a.remove();
	};
};

export const downloadChartSVG = (svgSelector: string) => {
	const svg = document.querySelector<SVGElement>(svgSelector);

	if (!svg) {
		console.error('SVG not found.');
		return;
	}

	const svgData = new XMLSerializer().serializeToString(svg);
	const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
	const href = URL.createObjectURL(blob);

	const a = Object.assign(document.createElement('a'), {
		href,
		style: 'display: none',
		download: 'chart.svg'
	});

	a.click();
	URL.revokeObjectURL(href);
	a.remove();
};

export const downloadInputData = (chartValues: ChartInputs) => {
	const yamlString = formJsonToYaml(chartValues);
	console.log(yamlString);
	const blob = new Blob([yamlString], { type: 'octet-stream' });
	const href = URL.createObjectURL(blob);

	const a = Object.assign(document.createElement('a'), {
		href,
		style: 'display: none',
		download: 'inputs.yaml'
	});

	a.click();
	URL.revokeObjectURL(href);
	a.remove();
};
