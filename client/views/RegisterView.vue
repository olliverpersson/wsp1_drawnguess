<template>
    
    <div>

        <h1> Skapa ett konto </h1>

        <p>{{error}}

        <p> Användarnamn </p>
        <input type="text" v-model="username.val"> {{ username.error }}

        <p> Mailadress </p>
        <input type="email" v-model="email.val"> {{ email.error }}

        <p> Lösenord </p>
        <input type="password" v-model="password.val"> {{ password.error }}

        <p> Lösenord igen</p>
        <input type="password" v-model="passagain.val"> {{ passagain.error }}

        <br>

        <button v-on:click="createUser()"> Skapa konto </button>

        <router-link to="login">Har du redan ett konto? Logga in</router-link>

    </div>

</template>

<script>

    import { Accounts } from 'meteor/accounts-base'

    export default {
    
        data () {

            return {

                email: {

                    val: '',
                    error: ''

                },
                username: {
                    
                    val: '',
                    error: ''

                },
                password: {

                    val: '',
                    error: ''

                },
                passagain: {

                    val: '',
                    error: ''

                },
                error: ''

            }

        },
        methods: {

            createUser() {

                let isValid = true;

                if( this.password.val.length < 8 ) {

                    isValid = false;

                    this.password.error = "Lösenordet måste vara minst 8 karaktärer långt";

                } else {

                    this.password.error = "";

                }

                if( this.password.val != this.passagain.val ) {

                    isValid = false;

                    this.passagain.error = "Lösenorden är inte lika";

                } else {

                    this.passagain.error = "";

                }

                if( this.email.val.length < 5 ) {

                    isValid = false;

                    this.email.error = "Vänligen ange en giltig mailadress";

                } else {

                    this.email.error = "";

                }

                if( this.username.val.length < 4 ) {

                    isValid = false;

                    this.username.error = "Användarnamnet måste vara minst 4 bokstäver långt";

                } else {

                    this.username.error = "";

                }

                if( isValid ) {

                    Accounts.createUser({

                        username: this.username.val,
                        email: this.email.val,
                        password: this.password.val

                    }, (error) => {

                        if( error != undefined){

                            this.error = error;

                        } else {

                            this.$router.push({name: 'all'});

                        }

                    });

                }

            }

        }

    }

</script>