<template>

	<div class="base">

		<div>

			<h1>The draw-something game</h1>

			<UiCard>

				<p> {{ error }} </p>

				<UiInput desc="Användarnamn" v-model="user"></UiInput>

				<UiInput desc="Lösenord" type="password" v-model="pass"></UiInput>

				<UiButton v-on:click="logIn()">Logga in</UiButton>

				<router-link to="register">Har du inte ett konto? Registrera dig här</router-link>

			</UiCard>

		</div>

	</div>

</template>

<script>
	import { Accounts } from 'meteor/accounts-base'

	import UiButton from '../ui/UiButton';
	import UiCard from '../ui/UiCard';
	import UiInput from '../ui/UiInput';

	export default {
	
		components: {

			UiButton,
			UiCard,
			UiInput

		},
		data() {

			return {

				user: '',
				pass: '',
				error: ''

			}

		},
		methods: {

			logIn() {

				Meteor.loginWithPassword(this.user, this.pass, (error) => {

					if( error != undefined ) {

						this.error = error;

					} else {

						this.$router.push({name: 'all'});

					}

				} );

			}

		}

	}

</script>

<style scoped>

	.base {

		background: url(../resources/blue-abstract.jpg) no-repeat center center fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100vh;
		width: 100vw

	}

	.base div {

		display: flex;

		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

</style>