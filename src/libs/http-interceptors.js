import Vue from 'vue';
import VueResource from 'vue-resource';
import Router from 'toby/router';

Vue.use(VueResource);

Vue.http.options.root = 'https://api.lnmpy.com/toby/';

const authToken = localStorage.getItem('AuthToken');
if (authToken) {
  Vue.http.headers.common.Authorization = authToken;
}

// http interceptors
Vue.http.interceptors.push((request, next) => {
  next((resp) => {
    let status = 200;
    let data = {};
    if (resp.status === 401 || resp.body.rc === 401) {
      status = 401;
      data.message = 'Token expired';
      return Router.push({ name: 'login', query: { nextUrl: '/' } });
    } else if (resp.status !== 200) {
      status = 400;
      data.message = 'API Error';
    } else if (resp.headers.get('content-type') === 'application/json') {
      status = resp.body.rc === 0 ? 200 : 400;
      data = resp.body.data === undefined ? {} : resp.body.data;
      if (resp.body.message) { // avoid write undefined value into data.message
        data.message = resp.body.message;
      }
    } else {
      data = resp.body;
    }
    if (status !== 200 && Vue.$msgbus) {
      Vue.$msgbus.nError(data.message);
    }
    return request.respondWith(data, { status });
  });
});

