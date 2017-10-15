import Router from 'toby/router';

// router interceptors
Router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('AuthToken') && to.name !== 'login') {
    next({ name: 'login', query: { nextUrl: to.path } });
  } else {
    next();
  }
});

Router.afterEach((to) => {
  // ga track
  if (window.ga) {
    window.ga('set', 'page', to.fullPath);
    window.ga('send', 'pageview');
  }
});
