<template>

	<div>

		<UiButton v-on:click="$router.push({name: 'all'})">
			Gå tillbaka
		</UiButton>

		<div v-if="game != undefined">

			<UiCard>

				<h1> {{ game.title }} </h1>

				<p>Spelare:</p>
				<p v-for="player in game.players" v-bind:key="player.username">
					{{ player.username }} - {{ player.score }} poäng
				</p>

			</UiCard>

			<UiCard v-if="game.owner == user._id">

				<UiInput v-model="addPlayerUsername" desc="Användarnamn på ny spelare"></UiInput>
				<UiButton v-on:click="addPlayer()">Lägg till spelare</UiButton>

			</UiCard>

			<UiCard v-if="game.currPlayer != user.username">

				<UiInput v-model="guess" desc="Vet du vad som ritas?" />
				<UiButton v-on:click="guessWord()">Gissa</UiButton>

			</UiCard>

			<canvas v-if="game.player == user.username"
					ref="canvas" 
					v-on:mousedown="clickingCanvas = true" 
					v-on:mouseup="clickingCanvas = false" 
					v-on:mousemove="drawDotOnCanvas"></canvas>

			<img v-if="game.currPlayer != user.username" v-bind:src="game.canvas">

		</div>
		
		<div v-else>

			<p>Loading...</p>

		</div>

	</div>

</template>

<script>
	
	import { Games } from '/imports/api/games';

	import UiButton from '../ui/UiButton';
	import UiInput from '../ui/UiInput';
	import UiCard from '../ui/UiCard';

	export default {
		
		props: ['id'],
		data () {

			return {

				clickingCanvas: false,
				addPlayerUsername: '',
				user: Meteor.user(),
				isCanvasChanged: false,
				guess: ''

			}

		},
		components: {

			UiButton,
			UiInput,
			UiCard

		},
		methods: {

			drawDotOnCanvas(e) {

				if(  this.clickingCanvas ) {

					let currX = e.offsetX;
            		let currY = e.offsetY;

					let ctx = this.$refs['canvas'].getContext('2d');

					ctx.arc(currX, currY, 2, 0, 2);
					ctx.strokeStyle = 'white';
					ctx.stroke();

					this.isCanvasChanged = true;

				}

			},
			addPlayer() {

				Meteor.call('GamesAddPlayer', this.id, this.addPlayerUsername);

				this.addPlayerUsername = "";

			},
			guessWord() {

				Meteor.call('GamesGuessWord', this.game._id, this.guess);

			}

		},
		meteor: {

			game() {

				return Games.findOne({});

			}

		},
		mounted() {

			this.$subscribe('games.one', [this.id]);
			this.$subscribe('games.canvas', [this.id]);

			// Skickar canvas om den har uppdaterats
			setInterval(() => {

				if( this.isCanvasChanged ) { 

					Meteor.call(
						'GamessSetDrawing', 
						this.game._id, 
						this.$refs['canvas'].toDataURL() );

					this.isCanvasChanged = false;

				}

			}, 250);

		}

	}

</script>

<style scoped>

	canvas {

		width: 800px;
		height: 400px;
		background: transparent;

	}

</style>
