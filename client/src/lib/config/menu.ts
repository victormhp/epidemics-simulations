export const navMenu = [
	{ title: 'Docs', href: '/docs/introduction', openInNewTab: false },
	{
		title: 'EoN Module',
		href: 'https://epidemicsonnetworks.readthedocs.io/en/latest/EoN.html',
		openInNewTab: true
	},
	{
		title: 'Github',
		href: 'https://github.com/victormhp/epidemics-sveltekit-flask',
		openInNewTab: true
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
					href: '/docs/introduction#epidemics-simulations'
				},
				{ title: 'EoN Module', href: '/docs/introduction#eon-module' }
			]
		},
		{
			title: 'Generate Chart',
			href: '/docs/chart',
			items: [
				{
					title: 'Upload your network',
					href: '/docs/chart#upload-your-network'
				},
				{ title: 'Form Data', href: '/docs/chart#form-data' },
				{ title: 'YAML', href: '/docs/chart#yaml' },
				{
					title: 'Simulation Investigation',
					href: '/docs/chart#simulation-investigation-object'
				}
			]
		},
		{
			title: 'Download options',
			href: '/docs/download',
			items: [
				{
					title: 'Download Inputs',
					href: '/docs/download#download-inputs'
				},
				{
					title: 'Download Chart',
					href: '/docs/download#download-chart'
				}
			]
		}
	]
};
