export const navMenu = [
	{
		title: 'EoN Module',
		href: 'https://epidemicsonnetworks.readthedocs.io/en/latest/EoN.html'
	},
	{
		title: 'Github',
		href: 'https://github.com/victormhp/epidemics-sveltekit-flask'
	}
];

export const docsMenu = {
	sections: [
		{
			title: 'Getting Started',
			href: '/docs/introduction',
			items: [
				{
					title: 'Epidemics Simulations',
					anchor: '#epidemics-simulations'
				},
				{ title: 'EoN Module', anchor: '#eon-module' }
			]
		},
		{
			title: 'Generate Chart',
			href: '/docs/chart',
			items: [
				{
					title: 'Upload your network',
					anchor: '#upload-your-network'
				},
				{ title: 'Form Data', anchor: '#form-data' },
				{ title: 'YAML', anchor: '#yaml' },
				{
					title: 'Simulation Investigation',
					anchor: '#simulation-investigation-object'
				}
			]
		},
		{
			title: 'Download options',
			href: '/docs/download',
			items: [
				{
					title: 'Download Inputs',
					anchor: '#download-inputs'
				},
				{
					title: 'Download Chart',
					anchor: '#download-chart'
				}
			]
		}
	]
};
