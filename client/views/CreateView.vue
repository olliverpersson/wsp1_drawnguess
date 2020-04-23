<template>

	<div>

		<h2>Skapa ett nytt spel:</h2>

		<form v-on:submit="Create()">

			<span>Titel <input type="text" v-model="game.title"></span>

		</form>

		<button v-on:click="Create()">Skapa</button>

		<button v-on:click="$router.push({name: 'all'})">
			Avbryt
		</button>

	</div>

</template>

<script>

	export default {

		data() {

			return {

				game: {

					title: ''

				}

			}

		},

		methods: {

			Create() {

				console.log(this.game)

				Meteor.call('GamesCreate', this.game);

				this.$router.push({ name: 'all' });

			}

		}

	}

</script>
