<template>
    
    <button v-on:click="$emit('click')"><slot></slot></button>

</template>

<style scoped>

    button {

        background: var(--color-5);
        color: var(--color-1);
        border: none;
        padding: 8px 30px;
        border-radius: 20px;
        transition: 0.3s;
        font-size: 14px;
        outline: none;
        cursor: pointer;

    }

    button:hover {

        background: var(--color-1);
        color: var(--color-5);

    }

</style>