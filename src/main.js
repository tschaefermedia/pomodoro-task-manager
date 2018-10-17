import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue"
import router from './router'
import store from './store'
import axios from 'axios'

/*Font Awesome*/
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(BootstrapVue)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.prototype.$api = axios.create({
    baseURL: 'http://localhost:4000',
    crossDomain: true
});

Vue.prototype.$api.interceptors.request.use(function(config){
    // Do something before request is sent
    console.log(config)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
Vue.prototype.$api.interceptors.response.use(function (response) {
    // Do something with response data
    console.log(response)
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

router.beforeEach((to, from, next) =>{
    if(to.meta.requiresAuth && process.env.NODE_ENV !== 'klo'){
        Vue.prototype.$api.get('/api/authenticated').then(function(response){
            if (from.query.redirect !== '' && from.path === '/login' && to.path !== '/login') {
                let path = from.query.redirect
                from.query.redirect = ''
                next({
                    path: path,
                    query: null
                })
            } else {
                next()
            }

        }).catch(function(error){
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        })
    }
    next()
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#taskManager')
