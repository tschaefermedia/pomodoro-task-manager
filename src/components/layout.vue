<template>
    <b-container fluid>
        <b-col cols="10" offset="1" class="pt-3">
            <b-navbar toggleable="md" type="info" variant="light"
                      v-if="!this.$route.fullPath.includes('login') && !this.$route.fullPath.includes('register')">
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

                <b-navbar-brand href="#" class="d-inline-block align-top">
                    <img src="../assets/tomato.jpg" width="35">
                </b-navbar-brand>
                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav>
                        <b-nav-item :class="this.$route.fullPath === '/' ? 'active' : ''">
                            <b-link to="/" class="nav-link" active-class>Dashboard</b-link>
                        </b-nav-item>
                        <b-nav-item :class="this.$route.fullPath === '/tasks' ? 'active' : ''">
                            <b-link to="/tasks" class="nav-link" active-class>Tasks</b-link>
                        </b-nav-item>
                    </b-navbar-nav>
                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item-dropdown right>
                            <!-- Using button-content slot -->
                            <template slot="button-content">
                                User
                            </template>
                            <b-dropdown-item @click="logout">Signout</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
            <slot></slot>
        </b-col>
    </b-container>
</template>

<script>
    export default {
        name: "layout",
        mounted() {
        },
        methods: {
            logout() {
                let self = this;
                this.$api.get('/api/logout').then(function (response) {
                    self.$router.push({path: '/login'})
                }).catch(function (error) {
                    console.error(error)
                })
            }
        }
    }
</script>

<style scoped>

</style>