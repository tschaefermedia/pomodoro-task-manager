<template>
    <layout>
        <b-container fluid>
            <b-row>
                <div class="col-10 offset-1">
                    <h1 class="text-center pt-5 pb-4">Tasks</h1>
                </div>
                <button class="btn btn-outline-info" @click="newTask">Add Task</button>
                <div class="col-10 offset-1">
                    <table class="table table-hover">
                        <thead class="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Due date</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Finished</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </b-row>
        </b-container>
    </layout>
</template>

<script>
    import Layout from "../components/layout";

    export default {
        name: "tasks",
        components: {Layout},
        methods: {
            newTask() {
                this.$api.post('/api/task', {
                    name: "testtask",
                    due: new Date('01.01.2018'),
                    priority: 1,
                    duration: 3,
                    finished: false
                }).then(function (response) {
                    console.log(response)
                }).catch(function (error) {
                    console.error(errors)
                })
            }
        }
    }
</script>

<style scoped>

</style>