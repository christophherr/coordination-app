// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueFire from 'vuefire';
import { store } from './store/store.js';

Vue.use(VueResource);
Vue.use(VueFire);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: { App }
});
