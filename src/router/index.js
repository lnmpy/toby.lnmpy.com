import Vue from 'vue';
import Router from 'vue-router';

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
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
});
