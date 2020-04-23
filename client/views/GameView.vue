<template>

	<div>

		<UiButton v-on:click="$router.push({name: 'all'})">
			Gå tillbaka
		</UiButton>

		<div v-if="game != undefined && round != undefined">

			<UiCard>

				<h1> {{ game.title }} </h1>

				<p>Spelare:</p>
				<p v-for="player in game.players">{{ player.username }} - {{ player.score }} poäng</p>

			</UiCard>

			<UiCard v-if="game.owner = user._id">

				<UiInput v-model="addPlayerUsername" desc="Användarnamn på ny spelare"></UiInput>
				<UiButton v-on:click="addPlayer()">Lägg till spelare</UiButton>

			</UiCard>

			<UiCard>

				<UiInput v-model="guess" desc="Vet du vad som ritas?" />
				<UiButton v-on:click="guessWord()">Gissa</UiButton>

			</UiCard>

			<canvas v-if="round.player == user.username"
					ref="canvas" 
					id="canvas"
					v-on:mousedown="clickingCanvas = true" 
					v-on:mouseup="clickingCanvas = false" 
					v-on:mousemove="drawDotOnCanvas"></canvas>

			<img v-if="round.player != user.username" v-bind:src="round.canvas">

		</div>
		
		<div v-else>

			<p>Loading</p>

		</div>

	</div>

</template>

<script>
	
	import { Games } from '/imports/api/games';
	import { Rounds } from '/imports/api/rounds';

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

				Meteor.call('RoundsGuessWord', this.round._id, this.guess);

			}

		},
		meteor: {

			game() {

				return Games.findOne({});

			},

			round() {

				return Rounds.findOne({});

			}

		},
		mounted() {

			this.$subscribe('games.one', [this.id]);
			this.$subscribe('round', [this.id]);

			setInterval(() => {

				if( this.isCanvasChanged ) { 

					Meteor.call(
						'RoundsSetDrawing', 
						this.round._id, 
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
