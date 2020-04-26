<template>

	<div>

		<UiButton v-on:click="$router.push({name: 'all'})">
			Gå tillbaka
		</UiButton>

		<div v-if="game != undefined">

			<UiCard>

				<h1 style="margin: 0px"> {{ game.title }} </h1>

				<p>Spelare:</p>
				<p v-for="player in game.players" v-bind:key="player.username">
					{{ player.username }} - {{ player.score }} poäng
				</p>

			</UiCard>

			<UiCard v-if="game.owner == user.username">

				<UiInput v-model="addPlayerUsername" desc="Användarnamn på ny spelare"></UiInput>
				<UiButton v-on:click="addPlayer()">Lägg till spelare</UiButton>

			</UiCard>

			<UiCard v-if="game.currPlayer != user.username">

				<UiInput v-model="guess" desc="Vet du vad som ritas?" />
				<UiButton v-on:click="guessWord()">Gissa</UiButton>

			</UiCard>

			<UiCard v-if="game.currPlayer == user.username">

				<p>Ditt ord är: <span style="font-size: 20px;">{{ game.word }}</span></p>
				
				Färg: <select v-model="brushColor">

					<option style="background: black; color: white">Black</option>
					<option style="background: blue">Blue</option>
					<option style="background: green">Green</option>
					<option style="background: grey">Grey</option>
					<option style="background: orange">Orange</option>
					<option style="background: red">Red</option>
					<option style="background: yellow">Yellow</option>
					<option style="background: grey">Grey</option>
					<option>White</option>

				</select>

				Storlek <select v-model="brushWidth">

					<option>1</option>
					<option>2</option>
					<option>4</option>
					<option>8</option>
					<option>12</option>
					<option>24</option>
					<option>48</option>

				</select>

				<p>Rita här:</p>
				<canvas
					style="border: 1px solid var(--color-3)"
					ref="canvas"
					height="400"
					width="600" 
					@mousedown="startDraw" 
					@mouseup="stopDraw"
					@mouseleave="stopDraw" 
					@mousemove="drawOnCanvas"></canvas>

			</UiCard>

			<UiCard v-if="game.currPlayer != user.username">

				<img v-bind:src="game.canvas">

			</UiCard>

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
				brushColor: "Black",
				brushWidth: 2,
				guess: '',
				lastX: 0,
				lastY: 0

			}

		},
		components: {

			UiButton,
			UiInput,
			UiCard

		},
		methods: {

			/*drawDotOnCanvas(e) {

				if(  this.clickingCanvas ) {

					let currX = e.offsetX;
            		let currY = e.offsetY;

					let ctx = this.$refs['canvas'].getContext('2d');

					ctx.arc(currX, currY, 2, 0, 2);
					ctx.strokeStyle = this.brushColor;
					ctx.stroke();

					this.isCanvasChanged = true;

				}

			},*/
			startDraw () {

				this.clickingCanvas = true;
		

			},
			stopDraw () {

				this.clickingCanvas = false;

			},
			drawOnCanvas (e) {

				let x = e.clientX - (window.scrollX + this.$refs['canvas'].getBoundingClientRect().left);
				let y = e.clientY - (window.scrollY + this.$refs['canvas'].getBoundingClientRect().top);
				

				if( this.clickingCanvas ) {

					console.log(x, y);

					let ctx = this.$refs['canvas'].getContext('2d');

					ctx.beginPath();
					ctx.strokeStyle = this.brushColor;
					ctx.lineWidth = this.brushWidth;
        			ctx.lineJoin = "round";
        			ctx.moveTo(this.lastX, this.lastY);
        			ctx.lineTo(x, y);
        			ctx.closePath();
					ctx.stroke();
				
				}

				this.lastX = x;
				this.lastY = y;

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
						'GamesSetDrawing', 
						this.game._id, 
						this.$refs['canvas'].toDataURL() );

					this.isCanvasChanged = false;

				}

			}, 250);

			// Set background to white
			let ctx = this.$refs['canvas'].getContext('2d');
			ctx.fillRect( 0, 0, 600, 400 );

		}

	}

</script>

<style scoped>

	canvas {

		background: transparent;

	}

</style>
