<template>
  <div class="header m-2">
    <div class="sidebar">
      <div class="action">
        <b-button v-b-toggle.sidebar-variant>
          <font-awesome-icon icon="list" />
        </b-button>
      </div>
      <b-sidebar id="sidebar-variant" title="Restaurant-CMS" shadow>
        <!-- <div class="px-3 py-2"> -->
        <ul class="buttons">
          <li class="btn" :class="{ 'active': layout === 'home' }"
              @click="push('/')">
            <p>menus</p>
          </li>
          <li class="btn" :class="{ 'active': layout === 'categories' }"
              @click="push('/categories')">
            <p>categories</p>
          </li>
          <li class="btn" :class="{ 'active': layout === 'items' }"
              @click="push('/items')">
            <p>items</p>
          </li>
        </ul>
      </b-sidebar>
    </div>
  </div>
</template>

<script>

export default {
  name: 'sideBar',
  data () {
    return {
      layout: this.$route.name
    }
  },
  methods: {
    push (path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/home/home.scss';
</style>
