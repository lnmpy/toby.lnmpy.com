import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

const ravenOptions = {
  autoBreadcrumbs: { xhr: false },
  release: process.env.GIT_SHA,
};

Vue.config.errorHandler = (err) => {
  console.error(err);
};

Raven
  .config(process.env.SENTRY_DSN, ravenOptions)
  .addPlugin(RavenVue, Vue)
  .install();

// eslint-disable-next-line
Promise.prototype.catch = (function (onRejected) {
  return this.then(undefined, ((err) => {
    if (err && err.stack) { console.error(err); Raven.captureException(err); }
    return onRejected(err);
  }));
});
