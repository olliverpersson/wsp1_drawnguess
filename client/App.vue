<template>

	<div class="base">

		<router-view></router-view>

	</div>

</template>

<script>

	export default {
		
	}

</script>

<style>

	@import url('https://fonts.googleapis.com/css2?family=Bungee+Inline&family=Roboto:wght@600&display=swap');

	.base {

		--font-header: 'Overpass';
		--font-body: 'Arvo';


		/*--color-1: #F23054;
		--color-2: #D93B65;
		--color-3: #314078;
		--color-4: #1F2226;
		--color-5: #373B40;
		--on-color-1: ;
		--on-color-2: ;
		--on-color-3: ;
		--on-color-4: ;*/


		--color-1: #4ACAD9;
		--color-2: #91F2F2;
		--color-3: #DCF0F2;
		--color-4: #177DA6;
		--color-5: #2AA4BF;
		--on-color-1: ;
		--on-color-2: ;
		--on-color-3: ;
		--on-color-4: ;

		background-color: var(--color-3);
		height: 100vh;
		width: 100vw;
		display: block;
		overflow: auto;

	}

	h1, h2, h3, h4, h5, h6 {

			color: white;
			font-family: 'Bungee Inline', sans-serif;

		}

		p, span {

			font-family: 'Roboto', sans-serif;
			font-size: 12px;
			color: white;

		}

</style>
