<template>
  <div>
    <NavBarGuest />
    <div class="article" v-for="item in articles" :key="item.id">
      <div class="item">
        <h5 class="title">{{ item.title }}</h5>
        <br><br>
        <h6 class="author">Author: {{ item.user.name }}</h6>
        <b-button v-b-modal.bv-modal-show class="show mt-3" variant="success" @click="show(item.title)">
          Show
        </b-button>
      </div>
    </div>
    <div id="show">
      <b-modal id="bv-modal-show" hidden-footer>
        <template #modal-title>
          Show article
        </template>
        <div class="d-block text-center">
          <showArticle :titleArt="this.title"/>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import showArticle from '@/components/modals/shows/showArticle.vue'
import NavBarGuest from '@/components/layouts/NavBarGuest.vue'
export default {
  name: 'GuestView',
  components: { NavBarGuest, showArticle },
  data () {
    return {
      articles: '',
      title: ''
    }
  },
  methods: {
    async show (title) {
      this.title = title
    }
  },
  async mounted () {
    await this.$resource.resource(0, '/articles')
    await this.$store.dispatch('getRes')
    const response = JSON.parse(this.$store.state.res)

    if (response.status) {
      this.articles = response.data
    } else {
      this.$addNotification('danger', response.message)
    }
  }
}
</script>
<style lang="scss" scoped>
.article {
  width: 50%;
  display: inline-block;

  .item {
    display: inline-block;
    width: 70%;
    height: 17%;
    border-radius: 6px;
    // box-shadow: 0 2px 2px rgb(204 197 185 / 50%);
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.15);
    background-color: #fff;
    color: #252422;
    margin: 5vh 4vw;
    position: relative;
    z-index: 1;
    border: none;
    padding: 20px;

    .title {
      font-weight: bold;
    }

    .title,
    .author {
      float: left;
    }

    .show {
      float: right;
    }
  }
}
</style>
