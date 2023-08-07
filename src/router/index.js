import Vue from 'vue';
import VueRouter from 'vue-router';
import IndexView from '@/views/IndexView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: IndexView,
  },
  {
    path: '/route/:id',
    name: 'route',
    component: () => import(/* webpackChunkName: "about" */ '@/views/RouteView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
