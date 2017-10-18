<template lang='pug'>
.home-view
  .content(v-if='!syncingAtFirst')
    mu-refresh-control(:refreshing="syncing", :trigger="trigger", @refresh="syncStates")
    mu-list(v-for='list of lists', key='id')
      mu-sub-header
        span {{ list.title }}
        mu-icon-button(:icon='list.expanded?"keyboard_arrow_up":"keyboard_arrow_down"', @click='list.expanded=!list.expanded')
      .cards(:style='{maxHeight: (list.expanded?"200vh":0), overflowY: (list.expanded?"auto":"hidden")}')
        mu-list-item(v-for='card of list.cards', key='id', :title='card.title | truncate(20) ', :href='card.url', target='_blank')
          mu-avatar(:src='card.favIconUrl', slot='leftAvatar', backgroundColor='white', :size='40')
          .description(slot='describe') {{ card.description }}
          mu-divider
    mu-float-button(icon='add')

  mu-circular-progress(v-if='syncingAtFirst', :size='60', :strokeWidth='5')

</template>

<script>

export default {
  name: 'home-view',
  data() {
    return {
      lists: [],
      syncing: false,
      syncingAtFirst: false,
      trigger: null,
    };
  },
  methods: {
    syncStates(force = true) {
      const localData = localStorage.getItem('states');
      if (force || !localData) {
        this.syncing = force;
        this.syncingAtFirst = !localData;
        this.$http.get('states')
          .then((resp) => {
            this.syncing = false;
            this.syncingAtFirst = false;
            this.lists = resp.body.lists;
            localStorage.setItem('states', JSON.stringify(resp.body));
          });
      } else {
        this.lists = JSON.parse(localData).lists;
      }
    },
    removeCard(id) {
      this.$http.delete(`cards/${id}`)
        .then(() => {
          this.syncStates();
        });
    },
  },
  mounted() {
    this.trigger = this.$el;
    this.syncStates(false);
  },
};
</script>

<style lang='less'>
.home-view {
  .description {
    color: #999;
  }
  .mu-float-button {
    position: fixed;
    bottom: 3vh;
    right: 3vh;
  }
  .mu-circular-progress {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .mu-sub-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 24px;
    background-color: #fbfbfb;
    cursor: pointer;
  }
  .cards {
    transition: max-height .8s cubic-bezier(.445,.05,.55,.95);
  }
}
</style>
