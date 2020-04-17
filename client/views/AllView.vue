<template>

	<div>

		<p>{{ user.username }} - {{ user.emails[0].address }}</p>

		<button v-on:click="logout()">Logga ut</button>

		<button v-on:click="$router.push({name: 'create'})">Skapa nytt spel</button>

		<p>Det här är dina spel:</p>

		<div v-for="game in allGames">

			<span> {{game.title}} </span>

			<router-link v-bind:to=" '/game/' + game._id ">Visa spel</router-link>

		</div>

	</div>

</template>

<script>

	import { Games } from '/imports/api/games';

	export default {

		data () {

			return {

				user: Meteor.user()

			}

		},
		meteor: {

			$subscribe: {

				'games.all': []

			},

			allGames() {

				return Games.find({});

			}

		}

	}

</script>
