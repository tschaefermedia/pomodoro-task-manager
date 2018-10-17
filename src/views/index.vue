<template>
    <layout>
        <b-container fluid>
            <b-row>
                <timer duration="10"/>
            </b-row>
            <b-row class="pt-2">
                <h1 class="text-center">Upcomming tasks</h1>
                <task-table />
            </b-row>
        </b-container>
    </layout>

</template>

<script>
    import layout from '../components/layout'
    import Timer from "../components/timer";
    import TaskTable from "../components/taskTable";

    export default {
        name: "index",
        components: {TaskTable, Timer, layout},
        data() {
            return {
                test: 123
            }
        }
    }
</script>

<style scoped>

</style>