<template>
  <div class="header p-2 mb-5">
    <h3 class="title mt-1"><strong>Our articles</strong></h3>
  </div>
</template>

<script>

export default {
  name: 'NavBarGuest',
  data () {
    return {
      layout: this.$route.name
    }
  },
  methods: {
    push (path) {
      this.$router.push(path)
    },
    async logout () {
      await this.$resource.resource(1, '/logout')
      await this.$store.dispatch('getRes')
      const response = JSON.parse(this.$store.state.res)

      if (response.status) {
        this.$addNotification('success', 'success')
        localStorage.clear()
        this.$router.push({ name: 'login' })
        // this.$router.go()
      } else {
        localStorage.clear()
        this.$router.push({ name: 'login' })
        this.$addNotification('danger', response.response)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 4rem;
  width: 100%;
  background-color: $myColor;
  box-shadow: 0 0 7px rgba(34, 30, 30, 0.83) !important;

  h3 {
    float: left;
  }
}
</style>
