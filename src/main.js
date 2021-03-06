import Vue from 'vue';
import VueCropper from 'vue-cropper';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/index.scss';

Vue.config.productionTip = false;
Vue.use(VueCropper);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
