import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);
Vue.use(
  VueAxios,
  axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
  }),
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
