<template>
    <div class="error">
        <div class="container-fluid">
            <div class="col-xs-12 ground-color text-center">
                <div class="container-error-404">
                    <div class="clip">
                        <div class="shadow"><span class="digit thirdDigit">{{thirdDigit}}</span></div>
                    </div>
                    <div class="clip">
                        <div class="shadow"><span class="digit secondDigit">{{secondDigit}}</span></div>
                    </div>
                    <div class="clip">
                        <div class="shadow"><span class="digit firstDigit">{{firstDigit}}</span></div>
                    </div>
                    <div class="msg">OH!<span class="triangle"></span></div>
                </div>
                <h2 class="h1">Sorry! Page not found</h2>
                <button v-if="finished" class="btn btn-outline-info btn-lg" @click="goBack">
                    <font-awesome-icon :icon="backArrow" />
                    Go Back
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

    export default {
        name: "notFound",
        data() {
            return {
                firstDigit: 0,
                secondDigit: 0,
                thirdDigit: 0,
                time: 15,
                finished: false
            }
        },
        computed: {
            backArrow() {
                return faArrowLeft;
            }
        },
        mounted() {
            this.firstLoop();
            this.secondLoop()
            this.thirdLoop();
        },
        methods: {
            goBack(){
              this.$router.push('/')
            },
            getRandomNum() {
                return Math.floor(Math.random() * 9) + 1;
            },
            firstLoop() {
                let self = this;
                let i = 0;
                let loop1 = setInterval(function () {
                    if (i > 100) {
                        clearInterval(loop1);
                        self.firstDigit = 4;
                        self.finished = true
                    } else {
                        self.firstDigit = self.getRandomNum();
                        i++;
                    }
                }, self.time);
            },
            secondLoop() {
                let self = this;
                let i = 0;
                let loop2 = setInterval(function () {
                    if (i > 80) {
                        clearInterval(loop2);
                        self.secondDigit = 0;
                    } else {
                        self.secondDigit = self.getRandomNum();
                        i++;
                    }
                }, self.time);
            },
            thirdLoop() {
                let self = this;
                let i = 0;
                let loop3 = setInterval(function () {
                    if (i > 40) {
                        clearInterval(loop3);
                        self.thirdDigit = 4;
                    } else {
                        self.thirdDigit = self.getRandomNum();
                        i++;
                    }
                }, self.time);
            }
        }
    }
</script>

<style scoped>

</style>