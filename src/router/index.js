import Vue from 'vue';
import VueRouter from 'vue-router';
import Cases from '@/views/Cases';
import Case from '@/views/Case';
import Home from '@/views/Home';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/cases',
    name: 'cases',
    component: Cases
  },
  {
    path: '/cases/:slug',
    name: 'case',
    component: Case,
    props: true
  }
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
