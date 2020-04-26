<template>
    
    <button v-on:click="$emit('click')"><slot></slot></button>

</template>

<style scoped>

    button {

        background: var(--color-2);
        color: var(--on-color-2);
        border: none;
        padding: 8px 30px;
        border-radius: 20px;
        transition: 0.3s;
        font-size: 14px;
        outline: none;
        cursor: pointer;

    }

    button:hover {

        box-shadow: 0px 0px 8px var(--color-2);

    }

</style>