<template>
  <!-- <div class="popup"> -->
  <div class="popup-inner">
    <slot />
    <div>
      <label class="label mb-2">Title</label>
      <input disabled type="text" class="mb-2" v-model="title" placeholder="Title...">
      <label class="label mb-2">Content</label>
      <div class="content-container">
        <p>
          <span v-html="content.text">
            {{ content.text }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'showArticle',
  props: ['titleArt'],
  data () {
    return {
      title: '',
      content: {
        text: ''
      }
    }
  },
  async mounted () {
    await this.$resource.resource(0, '/articles/slug/' + this.titleArt)
    await this.$store.dispatch('getRes')
    const response = JSON.parse(this.$store.state.res)

    if (response.status) {
      this.title = this.titleArt
      this.content.text = response.data.text
    } else {
      this.$addNotification('danger', response.message)
    }
  }
}
</script>
<style lang="scss" scoped>
.content-container {
  border: 1px solid #2f0feb38;
  margin-top: 2.5rem;
  height: 10rem;
  overflow-y: scroll;
}

.label {
  float: left;
}

input {
  margin-top: 3.5vh;
  background: transparent;
  border-radius: 4px;
  padding-left: 20px;
  display: block;
  width: 100%;
  height: 50%;
  border: 0.5px solid #2f0feb38;
}
</style>
