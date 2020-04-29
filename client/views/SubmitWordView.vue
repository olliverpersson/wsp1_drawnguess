<template>
    
    <div class="base">

        <UiCard>

            <UiButton v-on:click="$router.push({ name: 'all' })">Tillbaka </UiButton>

            <h1>Skicka in ett ord</h1>

            <p>Här kan du skicka in ett förslag på ett nytt ord. Tillsammans gör vi spelet bättre och roligare!</p>

            <UiInput v-model="word" desc="Ditt ord, på svenska"></UiInput>
        
            <UiButton v-on:click="submitWord">Skicka in</UiButton>

        </UiCard>

    </div>

</template>

<script>

    import UiButton from '../ui/UiButton';
    import UiInput from '../ui/UiInput';
    import UiCard from '../ui/UiCard';

    export default {

        data () {

            return {

                word: ''

            }

        },
        components: {

            UiButton,
            UiInput,
            UiCard

        },
        methods: {

            submitWord() {

                Meteor.call('WordsSubmit', this.word, 'sv');

            }

        }

    }

</script>

<style scoped>

    .base {

        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;

    }

</style>