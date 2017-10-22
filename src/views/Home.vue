<template lang='pug'>
.home-view
  .content(v-if='!syncingAtFirst')
    mu-refresh-control(:refreshing="syncing", :trigger="trigger", @refresh="syncStates")
    mu-list(v-for='list of lists', key='id')
      mu-sub-header
        span {{ list.title }}
        mu-icon-button(:icon='list.expanded ? "keyboard_arrow_up" : "keyboard_arrow_down"', @click='list.expanded=!list.expanded')
      .cards(:style='{maxHeight: (list.expanded ? "200vh" : 0), overflowY: (list.expanded ? "auto" : "hidden")}')
        mu-list-item(v-for='card of list.cards', key='id', :title='(card.customTitle || card.title) | truncate(20) ', :href='card.url', target='_blank', @click='clickCard($event, card)')
          mu-avatar(:src='card.favIconUrl', slot='leftAvatar', backgroundColor='white', :size='40')
          .description(slot='describe') {{ card.description }}
          mu-divider
    mu-float-button(icon='add', @click='resetDrawer(); dialogOpen=true')
  mu-dialog.dialog-add-card(:open="dialogOpen", title='Add new card')
    mu-select-field(v-model="dialogAddCard.listId", label="Choose the list to add")
      mu-menu-item(v-for="list of lists", key="id", :value="list.id", :title="list.title")
    mu-text-field(hintText="Title", v-model='dialogAddCard.title', type="text")
    mu-text-field(hintText="Description", v-model='dialogAddCard.description', :multiLine='true', :rows="3", :rowsMax="12", v-show='dialogAddCard.isNote')
    mu-text-field(hintText="Url", type="text", v-model='dialogAddCard.url', v-show='!dialogAddCard.isNote')
    mu-switch(label="Is note?", v-model='dialogAddCard.isNote')
    div(style='margin-top: 30px;display: flex;justify-content: space-around;', slot="actions")
      mu-flat-button(@click='dialogOpen=false') Canel
      mu-flat-button(primary, @click='!cardSaving && addCard(dialogAddCard)')
        span(v-if='!cardSaving') Save
        mu-circular-progress(v-if='cardSaving', color="white")

  mu-dialog.dialog-show-note(:open="noteOpen", @close="noteOpen=false", :title='dialogNote.customTitle', :scrollable='true')
    mu-content-block(v-html='dialogNote.customDescription')

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
      dialogOpen: false,
      dialogAddCard: {},
      cardSaving: false,
      noteOpen: false,
      dialogNote: {},
    };
  },
  methods: {
    syncStates(force = true) {
      const localData = localStorage.getItem('states');
      if (force || !localData) {
        this.syncing = force;
        this.syncingAtFirst = !localData;
        this.$http.get('states').then((resp) => {
          this.syncing = false;
          this.syncingAtFirst = false;
          this.lists = resp.body.lists;
          localStorage.setItem('states', JSON.stringify(resp.body));
        });
      } else {
        this.lists = JSON.parse(localData).lists;
      }
    },
    addCard({ listId, title, description, url, isNote }) {
      url = isNote ? '/note.html' : url;
      this.$http.post('cards', {
        listId,
        url,
        title,
        description,
        customTitle: title,
        customDescription: description,
      })
        .then(() => {
          this.dialogOpen = false;
          this.syncStates();
        });
    },
    clickCard($event, card) {
      if (card.url === '/note.html') {
        $event.preventDefault();
        this.dialogNote = card;
        this.noteOpen = true;
      }
    },
    removeCard(id) {
      this.$http.delete(`cards/${id}`).then(() => {
        this.syncStates();
      });
    },
    resetDrawer() {
      this.dialogAddCard = {
        isNote: false,
      };
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
  .content {
    .description {
      color: #999;
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
      transition: max-height 0.8s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
    .mu-float-button {
      position: fixed;
      bottom: 3vh;
      right: 3vh;
    }
  }
  .dialog-add-card {
    display: flex;
    flex-direction: column;
    .mu-text-field {
      width: 80%;
      align-self: center;
    }
    .mu-switch {
      align-self: flex-start;
      margin-left: 10%;
    }
  }
  .mu-circular-progress {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
