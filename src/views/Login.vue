<template lang='pug'>
.login-view
  .login-form
    img(src='/static/logo-toby.svg')
    mt-field(placeholder="Email", v-model="email")
    mt-field(placeholder="Password", type="password", v-model="password")
    mt-button(type="primary", size='large', @click='!loading && login()')
      span(v-if='!loading') Login
      mt-spinner(type="fading-circle", v-if='loading', color="white", style='display: table-cell;')

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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .login-form {
    margin-top: 30vh;
    display: flex;
    flex-direction: column;
    max-width: 80%;
    width: 30em;
    img {
      width: 10rem;
      margin: 30px auto;
    }
  }
}
.login-view {
  .mint-button {
    margin-top: 10px;
  }
}
</style>
