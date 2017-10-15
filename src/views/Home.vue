<template lang='pug'>

mt-loadmore.home-view(:top-method="syncStates", ref="loadmore", @top-status-change="handleSyncStatusChange")
  .mint-loadmore-top(slot="top")
    span(v-if="topStatus === 'drop'") ↑
    span(v-if="topStatus === 'pull'") ↓
    span(v-if="topStatus === 'loading'") Loading...
  .card-list(v-for='list of lists', key='id')
    .card-list-title {{ list.title }}
    mt-cell.card(:href='card.url', target='_blank', v-for='card of list.cards', key='id')
      .card-title {{ card.title }}
        img.card-thumbnail(:src='card.favIconUrl')
      .card-desc(v-if='!!card.description') {{ card.description }}

</template>

<script>
import { Indicator } from 'mint-ui';

export default {
  name: 'home-view',
  data() {
    return {
      lists: [],
      topStatus: null,
    };
  },
  methods: {
    handleSyncStatusChange(status) {
      this.topStatus = status;
    },
    syncStates(force = true) {
      const localData = localStorage.getItem('states');
      if (force || !localData) {
        Indicator.open();
        this.$http.get('states')
          .then((resp) => {
            Indicator.close();
            this.lists = resp.body.lists;
            this.$refs.loadmore.onTopLoaded();
            localStorage.setItem('states', JSON.stringify(resp.body));
          });
      } else {
        this.lists = JSON.parse(localData).lists;
        this.$refs.loadmore.onTopLoaded();
      }
    },
  },
  mounted() {
    this.syncStates(false);
  },
};
</script>

<style lang="less">
.home-view {
  .card-title {
    color: #333;
    font-size: 0.8rem;
    line-height: 1.2em;
    height: 1.2em;
    overflow-y: hidden;
    display: flex;
    .card-thumbnail {
      width: 1.1em;
      margin: 0.05em 0.5em 0.05em 0;
      order: -1;
    }
  }
  .card-desc {
    color: #999;
    font-size: 0.6rem;
    min-height: 1.2em;
    max-height: 2.4em;
    line-height: 1.2em;
    overflow-y: hidden;
  }
}

.home-view {
  .mint-cell-value {
    flex-direction: column;
    align-items: flex-start;
  }
  .mint-cell-title {
    display: none;
  }
}
</style>
