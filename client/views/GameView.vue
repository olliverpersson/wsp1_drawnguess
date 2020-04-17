<template>

	<div>

		<button v-on:click="$router.push({name: 'all'})">
			Gå tillbaka
		</button>

		<div v-if="game != undefined">

			<h1>Game: {{ game.title }} </h1>

			<button v-on:click="addRound()">Ny runda</button>

			<ul>

				<li v-for="round in rounds">

					<p>Round</p>

				</li>

			</ul>

		</div>
		
		<div v-else>

			<p>Loading</p>

		</div>

	</div>

</template>

<script>
	
	import { Games } from '/imports/api/games';
	import { Rounds } from '/imports/api/rounds';

	export default {
		
		props: ['id'],
		methods: {

			addRound() {

				Meteor.call('RoundsCreate', this.id);

			}

		},
		meteor: {

			game() {

				return Games.findOne({});

			},

			rounds() {

				return Games.find({});

			}

		},
		mounted() {

			this.$subscribe('games.one', [this.id]);
			this.$subscribe('rounds', [this.id]);

		}

	}

</script>
