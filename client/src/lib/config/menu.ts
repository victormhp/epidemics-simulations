export const navMenu = [
	{ title: 'Docs', link: '/docs/introduction', openInNewTab: false },
	{
		title: 'EoN Module',
		link: 'https://epidemicsonnetworks.readthedocs.io/en/latest/EoN.html',
		openInNewTab: true
	},
	{
		title: 'Github',
		link: 'https://github.com/victormhp/epidemics-sveltekit-flask',
		openInNewTab: true
	}
];

export const docsMenu = {
	sections: [
		{
			title: 'Getting Started',
			items: [
				{ title: 'Introduction', link: '/docs/introduction#introduction', hash: '#introduction' },
				{ title: 'EoN Module', link: '/docs/introduction#eon', hash: '#eon' }
			]
		},
		{
			title: 'Generate Chart',
			items: [
				{ title: 'Form Data', link: '/docs/chart#form-data', hash: '#form-data' },
				{ title: 'GraphML', link: '/docs/chart#graphml', hash: '#graphml' },
				{ title: 'YAML', link: '/docs/chart#yaml', hash: '#yaml' },
				{
					title: 'Simulation Investigation',
					link: '/docs/chart#simulation-investigation',
					hash: '#simulation-investigation'
				}
			]
		},
		{
			title: 'Download options',
			items: [
				{
					title: 'Download Inputs',
					link: '/docs/download#download-inputs',
					hash: '#download-inputs'
				},
				{
					title: 'Download Chart',
					link: '/docs/download#download-chart',
					hash: '#download-chart'
				}
			]
		}
	]
};
