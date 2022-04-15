import Vue from 'vue';
<<<<<<< HEAD
=======
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
>>>>>>> 1864a36 (add register and login index)
import App from './App.vue';
import router from './router';
import store from './store';

<<<<<<< HEAD
Vue.config.productionTip = false;

=======
import './assets/scss/index.scss';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAxios, axios);

>>>>>>> 1864a36 (add register and login index)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
