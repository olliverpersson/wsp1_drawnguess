<template>

	<div>

		<router-link to="/create">Skapa nytt spel</router-link>

		<p>Det här är dina spel:</p>

		<div v-for="game in GetGames">

			<span> {{game.title}} </span>

			<router-link v-bind:to=" '/game/' + game._id ">Visa spel</router-link>

		</div>

	</div>

</template>

<script>

	import { Games } from '/imports/api/games';

	export default {

		meteor: {

			$subscribe: {

				'games.all': []

			},

			GetGames() {

				return Games.find({});

			}

		}

	}

</script>
