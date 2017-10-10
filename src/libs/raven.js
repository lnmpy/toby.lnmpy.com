import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

const userFromLocalStorage = JSON.parse(decodeURIComponent(atob(
  localStorage.getItem('UserInfo') || 'JTdCJTdE')));

const ravenOptions = {
  autoBreadcrumbs: { xhr: false },
};

Vue.config.errorHandler = (err) => {
  console.error(err);
};

Raven
  .config('', ravenOptions)
  .addPlugin(RavenVue, Vue)
  .install();

Raven.setUserContext({
  email: userFromLocalStorage.email || '',
});

// eslint-disable-next-line
Promise.prototype.catch = (function (onRejected) {
  return this.then(undefined, ((err) => {
    if (err && err.stack) { console.error(err); Raven.captureException(err); }
    return onRejected(err);
  }));
});
