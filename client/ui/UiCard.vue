<template>
    
    <div v-on:click="$emit('click')">

        <slot></slot>

    </div>

</template>

<style scoped>

    div {

        background: var(--color-5);
        padding: 15px;
        margin: 10px;

    }

</style>