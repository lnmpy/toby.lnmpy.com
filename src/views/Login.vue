<template lang='pug'>
.login-view
    mt-field(placeholder="Email", v-model="email")
    mt-field(placeholder="Password", type="password", v-model="password")

    mt-button(type="primary", @click='login()') Login

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
      this.$http.post('users/login',
        { email: this.email, password: this.password })
        .then((resp) => {
          localStorage.setItem('AuthToken', resp.body.token);
          Vue.http.headers.common['x-auth-token'] = resp.body.token;
        });
    },
  },
};
</script>

<style scoped lang='less'>
@import '~toby/styles/flex.less';

.login-view {
    height: 100%;
    .flex-display();
    .flex-direction(column);
    .justify-content(center);
    .align-content(center);
    .align-items(center);
}

</style>
