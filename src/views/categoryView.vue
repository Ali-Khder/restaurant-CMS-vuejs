<template>
  <div>
    <nav-bar/>
    <div class="p-5">
      <h2 class="title mb-5">Categories</h2>
      <div class="table m-2">
        <div class="table-container">
          <b-table-simple hover small caption-top responsive>
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>id</b-th>
                <b-th>name</b-th>
                <b-th>discount</b-th>
                <b-th>level</b-th>
                <b-th>actions</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="item in items" :key="item.id">
                <b-td>{{ item.id }}</b-td>
                <b-td>{{ item.name }}</b-td>
                <b-td>{{ item.discount }} %</b-td>
                <b-td>{{ item.child_level }}</b-td>
                <b-td class="mb-0">
                  <!-- <button class="udpate-action" v-b-modal.bv-modal-update @click="setMethod(item.id, item.name)">
                    <p class="h5">
                      <b-icon icon="pencil-square" class="rounded lg"></b-icon>
                    </p>
                  </button> -->
                  <button class="delete-action" v-b-modal.bv-modal-delete
                          @click="setMethod(item.id, item.name, item.companyID)">
                    <p class="h5">
                      <b-icon icon="x" class="rounded lg"></b-icon>
                    </p>
                  </button>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <div class="tfoot">
            <ul>
              <li>
                <button class="pagination-btn changer" :disabled="isPrevious"
                        @click="move(1)">&lt;&lt;
                </button>
              </li>
              <li>
                <button class="pagination-btn changer" :disabled="isPrevious"
                        @click="move(current_page - 1)">&lt;
                </button>
              </li>
              <li>
                <button class="pagination-btn active" @click="move(current_page)">
                  {{ this.current_page }}
                </button>
              </li>
              <li>
                <button class="pagination-btn" v-if="this.current_page + 1 <= this.pages"
                        @click="move(current_page + 1)">
                  {{ this.current_page + 1 }}
                </button>
              </li>
              <li>
                <button class="pagination-btn" v-if="this.current_page + 2 <= this.pages"
                        @click="move(current_page + 2)">
                  {{ this.current_page + 2 }}
                </button>
              </li>
              <li>
                <button class="pagination-btn changer" :disabled="isNext" @click="move(current_page + 1)">&gt;
                </button>
              </li>
              <li>
                <button class="pagination-btn changer" :disabled="isNext" @click="move(last_page)">&gt;&gt;
                </button>
              </li>
            </ul>
          </div>
        </div>
        <b-button v-b-modal.bv-modal-add class="add mt-5" variant="outline-success">
          <font-awesome-icon icon="add"/>
        </b-button>
      </div>
      <div id="add">
        <b-modal id="bv-modal-add" hide-footer>
          <template #modal-title>
            Add new item
          </template>
          <div class="d-block text-center">
            <addCategory/>
          </div>
        </b-modal>
      </div>

      <div id="delete">
        <b-modal id="bv-modal-delete" hide-footer>
          <template #modal-title>
            Delete item
          </template>
          <div class="d-block text-center">
            <DeleteModal :id="this.id" :scope="'categories'" :name="this.name"/>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import addCategory from '@/components/modals/adds/addCategory.vue'

export default {
  name: 'categoryView',
  components: { addCategory },
  data () {
    return {
      items: [],
      id: '',
      name: '',
      pages: 0,
      current_page: 0,
      last_page: 0
    }
  },
  computed: {
    isPrevious () {
      return (this.current_page - 1) <= 0
    },
    isNext () {
      return (this.current_page + 1) > this.pages
    }
  },
  methods: {
    async move (page) {
      await this.$resource.resource(0, '/categories?page=' + page)
      await this.$store.dispatch('getRes')
      const response = JSON.parse(this.$store.state.res)

      if (response.status) {
        this.items = response.data.data
        this.pages = response.data.last_page
        this.current_page = response.data.current_page
        this.last_page = response.data.last_page
      } else {
        this.$addNotification('danger', response.message)
      }
    },
    push (path) {
      this.$router.push(path)
    },
    setMethod (id, name) {
      this.id = id
      this.name = name
    }
  },
  async mounted () {
    await this.$resource.resource(0, '/categories')
    await this.$store.dispatch('getRes')
    const response = JSON.parse(this.$store.state.res)

    if (response.status) {
      this.items = response.data.data
      this.pages = response.data.last_page
      this.current_page = response.data.current_page
      this.last_page = response.data.last_page
    } else {
      this.$addNotification('danger', response.message)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/table-paginate.scss';

.tfoot {
  /*display: flex;*/
  height: 5%;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  /*.pagination {*/
  /*  display: inline-block;*/

  ul {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 0 !important;

    li {
      display: inline;

      .pagination-btn {
        background-color: transparent;
        /*background-repeat: no-repeat;*/
        border: none;
        color: black;
        font-size: 11px;
        /*width: 100%;*/
        margin-left: 1vw;
        margin-right: 1vw;
        height: 4vh;
        font-weight: bold;
      }

      .changer {
        font-weight: bold;
      }

      .active {
        /*.primary-color;*/
        color: #E0592B !important;
      }
    }
  }
}
</style>
