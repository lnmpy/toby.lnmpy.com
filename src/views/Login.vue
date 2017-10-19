<template lang='pug'>
.login-view
  img(src='/static/logo-toby.svg')
  mu-text-field(hintText="Email", v-model="email")
  mu-text-field(hintText="Password", type="password", v-model="password")
  mu-raised-button(primary, @click='!loading && login()', fullWidth)
    span(v-if='!loading') Login
    mu-circular-progress(v-if='loading', color="white")

</template>

<script>
import Vue from 'vue';

export default {
  name: 'login-view',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    };
  },
  methods: {
    login() {
      delete Vue.http.headers.common.Authorization;
      Vue.http.headers.common.Authorization.name = 'hello';
      this.loading = true;
      this.$http.post('users/login',
        { email: this.email, password: this.password })
        .then((resp) => {
          this.loading = false;
          localStorage.setItem('AuthToken', resp.body.token);
          Vue.http.headers.common.Authorization = resp.body.token;
          this.$router.push('/');
        });
    },
  },
};
</script>

<style lang='less'>
.login-view {
  width: 60%;
  min-width: 200px;
  margin: 0 auto;
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 10rem;
    margin: 50px auto;
  }
  .mu-text-field {
    width: 100%;
    margin-bottom: 30px;
  }
}
</style>
