<template>
    <div class="col-10 offset-1">
        <h1 class="text-center pt-5 pb-4">Pomodoro Timer</h1>
        <h3 v-if="isRunning" class="text-center pb-4 header">Currently working on: <span class="text-danger underline">{{currentTask}}</span>
        </h3>
        <div class="timer col-4 offset-4 text-center pt-5 pb-5 pl-3 pr-3">{{ time | prettify }}</div>
        <div class="d-flex justify-content-center pt-5">
            <b-button-group>
                <button class="btn btn-success" @click="start" v-if="!isRunning && !paused">Start Task</button>
                <button class="btn btn-success" @click="resumeTask" v-if="paused">Resume Task</button>
                <button class="btn btn-warning" @click="pauseTask" v-if="isRunning && !paused">Pause Task</button>
                <button class="btn btn-danger" @click="reset" v-if="isRunning && !paused">Stop Task</button>
            </b-button-group>
        </div>
        <br>
        <p class="text-center text-monospace" v-if="isRunning">Running: {{currentTask}}</p>
    </div>
</template>

<script>
    export default {
        name: "timer",
        props: ['duration', 'task'],
        data() {
            return {
                isRunning: false,
                paused: false,
                pausedAt: 0,
                minutes: 0,
                secondes: 0,
                timer: null,
                time: 0,
                currentTask: "",
            }
        },
        filters: {
            prettify: function (value) {
                let minutes = Math.floor(value / 60)
                let secondes = value % 60
                if (minutes < 10) {
                    minutes = "0" + minutes
                }
                if (secondes < 10) {
                    secondes = "0" + secondes
                }
                return minutes + ":" + secondes
            }
        },
        created() {
            this.time = this.duration;
        },
        methods: {
            start() {
                if (this.task !== "" && this.task !== undefined)
                    this.currentTask = this.task
                else
                    this.currentTask = "Test Task"
                this.isRunning = true

                if (!this.timer) {
                    this.timer = setInterval(() => {
                        if (this.time > 0) {
                            this.time--
                        } else {
                            clearInterval(this.timer)
                            this.reset()
                        }
                    }, 1000)
                }
            },
            stop() {
                this.isRunning = false
                clearInterval(this.timer)
                this.timer = null
            },
            pauseTask() {
                this.paused = true
                this.pausedAt = this.time;
                clearInterval(this.timer)
                this.timer = null
            },
            resumeTask() {
                this.paused = false
                this.time = this.pausedAt
                this.pausedAt = 0
                this.start()
            },
            reset() {
                this.stop()
                this.time = this.duration;
                this.secondes = 0
                this.minutes = 0
            },
        }
    }
</script>

<style scoped>

</style>