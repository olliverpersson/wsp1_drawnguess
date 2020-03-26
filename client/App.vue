<script>
	import { Router, Route } from "svelte-routing";

	import LoginView from './views/LoginView.svelte';
	import AllView from './views/AllView.svelte';
	import GameView from './views/GameView.svelte';

	export let url = "";

</script>

<Router url={url}>
	<Route path="/" component={AllView} />
	<Route path="login" component={LoginView} />
	<Route path="game/:id" component={GameView} />
</Router>
