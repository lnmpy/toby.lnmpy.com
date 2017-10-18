import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

const ravenOptions = {
  autoBreadcrumbs: { xhr: false },
};

Vue.config.errorHandler = (err) => {
  console.error(err);
};

Raven
  .config('https://0a78ca5db79d44d29886850cf0e11f19@sentry.io/231717', ravenOptions)
  .addPlugin(RavenVue, Vue)
  .install();

// eslint-disable-next-line
Promise.prototype.catch = (function (onRejected) {
  return this.then(undefined, ((err) => {
    if (err && err.stack) { console.error(err); Raven.captureException(err); }
    return onRejected(err);
  }));
});
