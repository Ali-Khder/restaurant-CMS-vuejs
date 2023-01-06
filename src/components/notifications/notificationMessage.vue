<template>
  <Transition>
    <div :class="typeClass" class="alert fade show" role="alert">
        {{ notification.message }}
    </div>
  </Transition>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
  name: 'notificationMessage',
  props: ['notification'],
  data () {
    return {
      timeout: null
    }
  },
  computed: {
    typeClass () {
      return `alert-${this.notification.type}`
    }
  },
  created () {
    this.timeout = setTimeout(() => {
      this.$store.dispatch('removeNotification', this.notification)
    }, 2500)
  },
  beforeUnmount () {
    clearTimeout(this.timeout)
  }
}
</script>

<style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
