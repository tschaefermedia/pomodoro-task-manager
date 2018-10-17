<template>
    <b-table striped hover :items="tasks"></b-table>
</template>

<script>
    export default {
        name: "taskTable",
        props: ['tasks'],

    }
</script>

<style scoped>

</style>