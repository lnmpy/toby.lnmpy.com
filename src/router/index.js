import Vue from 'vue';
import Router from 'vue-router';

import NotFoundView from 'toby/views/NotFound';
import AboutView from 'toby/views/About';
import LoginView from 'toby/views/Login';
import HomeView from 'toby/views/Home';

Vue.use(Router);

export default new Router({
  root: '/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '*',
      redirect: { name: '404' },
    },
  ],
});
