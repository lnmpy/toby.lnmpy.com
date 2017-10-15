<template lang='pug'>
.login-view
  .login-form
    img(src='/static/logo-toby.svg')
    mt-field(placeholder="Email", v-model="email")
    mt-field(placeholder="Password", type="password", v-model="password")
    mt-button(type="primary", size='large', @click='login()') Login

</template>

<script>
import Vue from 'vue';

export default {
  name: 'login-view',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      delete Vue.http.headers.common.Authorization;
      this.$http.post('users/login',
        { email: this.email, password: this.password })
        .then((resp) => {
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .login-form {
    margin-top: 30vh;
    img {
      width: 10rem;
    }
  }
}
</style>
