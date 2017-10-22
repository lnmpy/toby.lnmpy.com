import Vue from 'vue';
import VueResource from 'vue-resource';
import Router from 'toby/router';

Vue.use(VueResource);

Vue.http.options.root = 'https://api.lnmpy.com/public/toby/';

const authToken = localStorage.getItem('AuthToken');
if (authToken) {
  Vue.http.headers.common.Authorization = authToken;
}

// http interceptors
Vue.http.interceptors.push((request, next) => {
  next((resp) => {
    if (resp.status === 401) {
      Router.push({ name: 'login', query: { nextUrl: '/' } });
      return request.respondWith('Token expired', resp);
    } else if (resp.status >= 400) {
      return request.respondWith('API Error', resp);
    }
    return resp;
  });
});

