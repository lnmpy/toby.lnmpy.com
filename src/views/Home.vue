<template lang='pug'>

.list-view
  .cards(v-for='list of lists', key='id')
    mt-cell-swipe.card(:to='card.url', target='_blank', :right="right", v-for='card of list.cards', key='id')
      .cell
        .cell-title {{ card.title }}
          img.cell-thumbnail(:src='card.favIconUrl')
        .cell-desc(v-if='!!card.description') {{ card.description }}

</template>

<script>
import { Indicator } from 'mint-ui';

export default {
  name: 'home-view',
  data() {
    return {
      lists: [],
      right: [
        {
          content: 'Delete',
          style: { background: 'red', color: '#fff' },
          handler: () => this.$messagebox('delete'),
        },
      ],
    };
  },
  methods: {
    fetchData() {
      Indicator.open();
      this.$http.get('states')
        .then((resp) => {
          Indicator.close();
          this.lists = resp.body.lists;
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="less">
.list-view {
  .cell {
    .cell-thumbnail {
      width: 1.1em;
      margin: 0.05em 0.5em 0.05em 0;
      order: -1;
    }
    .cell-title {
      color: #333;
      font-size: 0.8rem;
      line-height: 1.2em;
      height: 1.2em;
      overflow-y: hidden;
      display: flex;
    }
    .cell-desc {
      color: #999;
      font-size: 0.6rem;
      min-height: 1.2em;
      max-height: 2.4em;
      line-height: 1.2em;
      overflow-y: hidden;
    }
  }
}
.list-view {
  .mint-cell-title {
    display: none;
  }
}
</style>
