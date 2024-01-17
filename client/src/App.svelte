<script lang="ts">
	import { Router, Route } from 'svelte-routing';
	import { Layout, Dashboard, Docs } from './routes';

	export let url = '';
</script>

<Router {url}>
	<Layout>
		<Route path="/" component={Dashboard} />
		<Route path="/docs" component={Docs} />
		<Route path="/docs/:slug" component={Docs} />
	</Layout>
</Router>
