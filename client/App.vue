<template>

	<div class="appcomponent">

		<router-view></router-view>

	</div>

</template>

<script>

	export default {
		
	}

</script>

<style>

	@import url('https://fonts.googleapis.com/css2?family=Corben&family=Roboto&display=swap');


	.appcomponent {

		--font-header: 'Corben', sans-serif;
		--font-body: 'Roboto', sans-serif;


		/*--color-1: #F23054;
		--color-2: #D93B65;
		--color-3: #314078;
		--color-4: #1F2226;
		--color-5: #373B40;
		--on-color-1: ;
		--on-color-2: ;
		--on-color-3: ;
		--on-color-4: ;*/


		--color-1: #93EDD4; /* primary */
		--color-2: #3CBAC8; /* secondary */
		--color-3: rgb(41, 41, 41); /* third */
		--color-4: rgb(255, 255, 255); /* background */
		--on-color-1: white;
		--on-color-2: white;
		--on-color-3: #3CBAC8;
		--on-color-4: #3CBAC8;

		background-color: var(--color-4);
		height: 100vh;
		width: 100vw;
		display: block;
		overflow: auto;

	}

	h1, h2, h3, h4, h5, h6 {

			color: var(--color-3);
			font-family: var(--font-header);

		}

	p, span {

		font-family: 'Roboto', sans-serif;
		font-size: 12px;
		color: var(--color-3);

	}

</style>
