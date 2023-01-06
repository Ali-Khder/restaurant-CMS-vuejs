<template>
  <div class="notifications" v-if="this.$store.state.notifications.length">
    <notificationMessage
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import notificationMessage from './notificationMessage'
import { mapState } from 'vuex'

export default {
  name: 'notificationComponent',
  components: { notificationMessage },
  computed: mapState(['notifications'])
}
</script>

<style lang="scss" scoped>
  .notifications {
    margin-top: 1vw;
    word-break: break-word;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1000;
    margin-right: 15px;
    width: 25%;
    height: 10%;
    font-size: 1.2vw;
  }
  .alert-danger {
    background-color: #c94242;
    border-color: #c94242;
    color: white;
    opacity: 0.8;
  }
</style>
