<template lang='pug'>

.change-log-view
  .logo
    img(src='/static/logo-toby.svg')

  mu-sub-header About:
  mu-content-block
    | This is fork of
    | &nbsp;
    a(href='https://www.gettoby.com') Toby
    | , based on VueJs & MuseUI.

  mu-sub-header Change History:
  mu-timeline
    mu-timeline-item(v-for='item of timelines', key='item.time')
      span(slot="time") {{ item.time }}
      span(slot="des") {{ item.des }}

</template>

<script>

export default {
  name: 'change-log-view',
  data() {
    return {
      timelines: [
        {
          time: '2017/10/17',
          des: 'Refactored with Muse-UI',
        },
        {
          time: '2017/10/15',
          des: 'First inited',
        },
      ],
    };
  },
};
</script>

<style lang='less'>
.change-log-view {
    padding: 20px;
}
</style>
