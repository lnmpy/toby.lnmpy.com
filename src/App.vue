<template lang='pug'>
  .app
    router-view
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="less">
@import '~toby/styles/reset.less';
@import '~toby/styles/fonts.less';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
