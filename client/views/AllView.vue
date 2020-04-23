<template>

	<div>

		<p>{{ user.username }} - {{ user.emails[0].address }}</p>

		<UiButton v-on:click="logout()">Logga ut</UiButton>

		<UiButton v-on:click="$router.push({name: 'create'})">Skapa nytt spel</UiButton>

		<div class="grid">

			<UiCard v-for="game in allGames"
					v-on:click="$router.push({ name: 'game', params: { id: game._id } })"
					v-bind:key="game.id">

				<h3 style="margin-top: 0px; color: white"> {{game.title}} </h3>
				
				<span v-if="game.isArchived">Avslutat</span>

			</UiCard>
		
		</div>

	</div>

</template>

<script>

	import UiButton from '../ui/UiButton';
	import UiCard from '../ui/UiCard';

	import { Games } from '/imports/api/games';

	export default {

		data () {

			return {

				user: Meteor.user()

			}

		},
		components: {

			UiCard,
			UiButton

		},
		meteor: {

			$subscribe: {

				'games.all': []

			},

			allGames() {

				return Games.find({});

			}

		},
		methods: {

			logout() {

				Meteor.logout( (error) => {

					if(error) {

						alert("Utloggningen misslyckades.");
						console.log(error);

					} else {

						this.$router.push( { name: "login" } );

					}

				});

			}

		}

	}

</script>

<style scoped>

	div.grid {

		display: flex;
		flex-wrap: wrap;

	}

	div.grid * {

		width: 250px;
		cursor: pointer;

	}

</style>
