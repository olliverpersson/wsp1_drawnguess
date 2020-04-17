<template>

	<div>

		<h1>Logga in</h1>

		<p> {{ error }} </p>

		<input type="text" v-model="user">

		<input type="password" v-model="pass">

		<button v-on:click="logIn()">Logga in</button>

		<router-link to="register">Har du inte ett konto? Registrera dig här</router-link>

	</div>

</template>

<script>
	import { Accounts } from 'meteor/accounts-base'

	export default {

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
