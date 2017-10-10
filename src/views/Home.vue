<template lang='pug'>
mt-cell-swipe(title="text", :right="right")

</template>

<script>
export default {
  name: 'home-view',
  data() {
    return {
      right: [
        {
          content: 'Delete',
          style: { background: 'red', color: '#fff' },
          handler: () => this.$messagebox('delete'),
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">

</style>
