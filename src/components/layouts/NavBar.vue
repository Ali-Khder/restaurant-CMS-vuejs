<template>
  <div class="header m-2">
    <side-bar />
    <div class="logout">
      <button class="udpate-action" v-b-modal.bv-modal-logout>
        <p class="icon h5">
          <font-awesome-icon icon="sign-out"/>
          <!-- <b-icon icon="door-open-fill" class="rounded lg"></b-icon> -->
        </p>
      </button>
    </div>
      <div id="logout">
        <b-modal id="bv-modal-logout" hide-footer>
          <template #modal-title>
            Logout from CMS
          </template>
          <div class="d-block text-center">
            <h4 class="popup-title">Are you sure?</h4>
            <div class="buttons" style="float: right;">
              <b-button class="save primary-back mt-2" variant="danger" @click="logout()">
                <div>Logout</div>
              </b-button>
            </div>
          </div>
        </b-modal>
      </div>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
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
@import '@/styles/home/home.scss';
</style>
