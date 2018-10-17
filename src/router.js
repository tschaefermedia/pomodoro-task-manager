import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index'
import login from './views/login'
import notFound from './views/notFound'
import tasks from './views/tasks'
import register from './views/register'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: index,
            name: 'index',
            meta: {requiresAuth: true}
        },
        {
            path: '*',
            component: notFound,
            name: 'notFound'
        },
        {
            path: '/login',
            component: login,
            name: 'login'
        },
        {
            path: '/register',
            component: register,
            name: 'register'
        },
        {
            path: '/tasks',
            component: tasks,
            name: 'tasks',
            meta: {requiresAuth: true}
        }
    ]
})
