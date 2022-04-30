import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import HomeView from '../views/HomeView.vue';
import userRoutes from './module/user';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/pesttable',
    name: 'pesttable',
    component: () => import(/* webpackChunkName: "about" */ '../views/pesttable/MyPesttable.vue'),
  },
  ...userRoutes,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (store.state.userModule.token) {
      next();
    } else {
      router.push({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;
