<template>
    
    <div class="UiCard" v-on:click="$emit('click')">

        <slot></slot>

    </div>

</template>

<style scoped>

    .UiCard {

        background: var(--color-4);
        padding: 15px;
        margin: 10px;
        box-shadow: 0px 0px 15px rgba(0,0,0,0.10);

    }

</style>