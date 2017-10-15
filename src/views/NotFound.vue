<template lang="pug">
#main
  .fof
    h1 Error 404
</template>

<script>
export default {
  name: 'notfound-view',
  data() {
    return {
      msg: '404 Page',
    };
  },
};
</script>

<style scoped>

#main {
  display: table;
  width: 100%;
  height: 100vh;
  text-align: center;
}

.fof {
  display: table-cell;
  vertical-align: middle;
}

.fof h1 {
  color: #999;
  font-size: 50px;
  display: inline-block;
  padding-right: 12px;
  animation: type .5s alternate infinite;
}

@keyframes type {
  from {
    box-shadow: inset -3px 0px 0px #888;
  }
  to {
    box-shadow: inset -3px 0px 0px transparent;
  }
}
</style>
