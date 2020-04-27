<template>

	<div class="base">

		<header>

			<UiCard>

				<h2 style="margin-bottom: 0px;">{{ user.username }}</h2>
				<p style="margin-top: 0px;"> {{ user.emails[0].address }} </p>

				<UiButton v-on:click="$router.push({name: 'create'})">Skapa nytt spel</UiButton>
				<UiButton style="margin-bottom: 5px" v-on:click="logout()">Logga ut</UiButton>

			</UiCard>

		</header>

		<div class="grid">

			<UiCard v-for="game in allGames"
					v-on:click="$router.push({ name: 'game', params: { id: game._id } })"
					v-bind:key="game.id">

				<h3 style="margin: 0px"> {{game.title}} </h3>

				<p> {{ game.players.length }} spelare </p>
				
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
		padding-top: 40px;

	}

	div.grid * {

		width: 250px;
		cursor: pointer;

	}

	header {

		display: flex;
		align-items: center;
		flex-direction: column;
		background: var(--color-1);
		text-align: center;
		padding-top: 15px; 

	}

	header div {

		position: relative;
		top: 40px;

	}

	.base {

		height: 100%;
		background: rgb(250,250,250);

	}

</style>
