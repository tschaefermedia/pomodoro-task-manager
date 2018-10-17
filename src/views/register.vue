<template>
    <layout>
        <div class="container py-5">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <!-- form card login -->
                    <div class="card rounded-0">
                        <div class="card-header">
                            <h3 class="mb-0">Register</h3>
                        </div>
                        <div class="card-body">
                            <form class="form" role="form" autocomplete="off" id="formLogin" novalidate=""
                                  @submit.prevent>
                                <div class="form-group">
                                    <label for="uname1">Username</label>
                                    <input type="text" class="form-control form-control-lg rounded-0" name="uname1"
                                           id="uname1" required v-model="username"
                                           :class="emptyUsername ? 'is-invalid' : ''">
                                    <div class="invalid-feedback">Oops, you missed this one.</div>
                                </div>
                                <div class="form-group">
                                    <label for="mail1">E-Mail</label>
                                    <input type="email" class="form-control form-control-lg rounded-0" name="mail1"
                                           id="mail1" required v-model="email" :class="emptyMail ? 'is-invalid' : ''">
                                    <div class="invalid-feedback">Oops, you missed this one.</div>
                                </div>
                                <div class="form-group">
                                    <label for="pwd1">Password</label>
                                    <input type="password" class="form-control form-control-lg rounded-0" id="pwd1"
                                           required autocomplete="new-password" v-model="password"
                                           :class="emptyPassword ? 'is-invalid' : ''">
                                    <div class="invalid-feedback">Enter your password too!</div>
                                </div>
                                <div class="form-group">
                                    <label for="pwd2">Password Confirmation</label>
                                    <input type="password" class="form-control form-control-lg rounded-0" id="pwd2"
                                           required autocomplete="new-password" v-model="passwordConf"
                                           :class="dontMatch ? 'is-invalid' : ''">
                                    <div class="invalid-feedback">The passwords don't match!</div>
                                </div>
                                <div class="buttons d-flex flex-row-reverse">
                                    <button type="button" class="btn btn-success btn-lg ml-1" id="btnRegister" @click="register" @keyup.enter="register">Register
                                    </button>
                                    <router-link tag="button" to="/login" class="btn btn-info btn-lg mr-1">Back to
                                        Login
                                    </router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>

<script>
    import Layout from "../components/layout";

    export default {
        name: "login",
        components: {Layout},
        data() {
            return {
                username: "",
                email: "",
                password: "",
                passwordConf: "",
                dontMatch: false,
                emptyUsername: false,
                emptyMail: false,
                emptyPassword: false
            }
        },
        methods: {
            register() {
                this.emptyPassword = this.emptyMail = this.emptyUsername = this.dontMatch = false;
                if (this.username === '') {
                    this.emptyUsername = true
                } else if (this.email === '') {
                    this.emptyMail = true
                } else if (this.password === '') {
                    this.emptyPassword = true
                } else if (this.password !== this.passwordConf) {
                    this.dontMatch = true
                } else {
                    this.$api.post('/api/login',
                        {
                            email: this.email,
                            username: this.username,
                            password: this.password
                        }
                    ).then(function (response) {
                        console.log(response)
                    }).catch(function (error) {
                        console.error(error)
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>