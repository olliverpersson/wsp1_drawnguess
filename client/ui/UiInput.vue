<template>
    
    <div>
    
        <p> {{ desc }} </p>

        <input 
        v-bind="$attrs"
        v-bind:value="value" 
        v-on:input="$emit('input', $event.target.value)" 
        v-bind:type="type">
    
    </div>

</template>

<script>
   
   export default {
    
       props: [ 'desc', 'value', 'type' ]

    }

</script>

<style scoped>

    div {

        color: white;
        margin: 0px;
        padding: 5px;
        font-size: 10px;

    }

    p {

        margin: 0px;
        margin-bottom: 4px;
        font-align: left;

    }

    input {

        background: var(--color-2);
        border-radius: 15px;
        padding: 5px 15px;
        border: none;
        outline: none;
        color: white;
        font-family: 'Roboto', sans-serif;

    }

</style>