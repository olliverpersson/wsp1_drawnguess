<script>

	let register = false;

	let email = '';
	let pass = '';
	let passrepeat = '';

</script>


<div>

	<h1>Kortspel</h1>

	<input type="email" value={email}>

	<input type="password" value={pass}>

	{#if register}
		<input type="password" value={passrepeat}>
		<button>Register</button>
		<p on:click={register = false}>Already a user? Log in here.</p>
	{:else}
		<button>Log in</button>
		<p on:click={register = true}>Not a user yet? Register here.</p>
	{/if}

</div>
