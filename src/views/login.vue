<template>
    <layout>
        <div class="container py-5">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <!-- form card login -->
                    <div class="card rounded-0">
                        <div class="card-header">
                            <h3 class="mb-0">Login</h3>
                        </div>
                        <div class="card-body">
                            <form class="form" role="form" autocomplete="off" id="formLogin" novalidate=""
                                  @submit.prevent="login">
                                <div class="form-group">
                                    <label for="uname1">Username</label>
                                    <input type="text" class="form-control form-control-lg rounded-0" name="uname1"
                                           id="uname1" required v-model="username" :class="usernameEmpty ? 'is-invalid' : ''">
                                    <div class="invalid-feedback">Oops, you missed this one.</div>
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" class="form-control form-control-lg rounded-0" id="pwd1"
                                           required autocomplete="new-password" v-model="password" :class="passwordEmpty ? 'is-invalid' : ''">
                                    <div class="invalid-feedback">Enter your password too!</div>
                                </div>
                                <div class="buttons d-flex flex-row-reverse">
                                    <button type="submit" class="btn btn-success btn-lg mr-1" id="btnLogin" style="order: 0;">Login
                                    </button>
                                    <router-link tag="button" to="/register" class="btn btn-info btn-lg mr-1" style="order: 1;">Register
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
                password: "",
                usernameEmpty: false,
                passwordEmpty: false
            }
        },
        methods: {
            login() {
                let self = this
                this.usernameEmpty = this.passwordEmpty = false;
                if (this.username === '') {
                    this.usernameEmpty = true
                } else if (this.password === '') {
                    this.passwordEmpty = true
                }else{
                    self.$api.post('/api/login', {
                        logusername: this.username,
                        logpassword: this.password
                    }).then(function(response){
                        console.log(response)
                        self.$router.push('/')
                    }).catch(function(error){
                        console.error(error)
                    })
                }


            }
        }
    }
</script>

<style scoped>

</style>