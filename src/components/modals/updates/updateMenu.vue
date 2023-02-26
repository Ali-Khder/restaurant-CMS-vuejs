<template>
  <div class="popup-inner">
    <slot/>
    <div>
      <label class="label mb-2">Name</label>
      <input type="text" class="mb-2" v-model="name" placeholder="Name">

      <label class="label mb-2">Discount</label>
      <input type="text" class="mb-2" v-model="discount" placeholder="Discount" disabled>

      <label class="label mb-2">My Categories, choose to delete</label>
      <b-form-select multiple class="form-control form-control mb-2"
                     v-model="deleteCategories"
                     :options="this.menuCategories"></b-form-select>

      <label class="label mb-2">All Categories, choose to update</label>
      <b-form-select multiple class="form-control form-control mb-2"
                     v-model="newCategories"
                     :options="this.categories"></b-form-select>
    </div>
    <div class="buttons">
      <b-button class="save primary-back mt-2" variant="success" @click="update()">
        <div>Update</div>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'updateMenu',
  props: ['id'],
  data () {
    return {
      categories: [],
      menuCategories: [],
      newCategories: [],
      deleteCategories: [],
      name: '',
      discount: 0,
      parent: 0
    }
  },
  methods: {
    async update () {
      const fd = new FormData()
      fd.append('name', this.name)

      if (this.newCategories.length !== 0) {
        for (let i = 0; i < this.newCategories.length; i++) {
          fd.append(`category_add[${i}]`, this.newCategories[i])
        }
      }

      if (this.deleteCategories.length !== 0) {
        for (let i = 0; i < this.deleteCategories.length; i++) {
          fd.append(`category_delete[${i}]`, this.deleteCategories[i])
        }
      }
      await this.$resource.resource(1, `/menus/${this.id}`, fd)
      await this.$store.dispatch('getRes')
      const response = JSON.parse(this.$store.state.res)

      if (response.status === true) {
        this.$addNotification('success', response.message)
        this.$router.go()
      } else {
        this.$addNotification('danger', response.message)
      }
    }
  },
  async mounted () {
    await this.$resource.resource(0, `/menus/${this.id}`)
    await this.$store.dispatch('getRes')
    let response = JSON.parse(this.$store.state.res)

    if (response.status === true) {
      this.name = response.data.name
      this.discount = response.data.discount
      const array = response.data.categories
      for (let index = 0; index < array.length; index++) {
        this.menuCategories.push({
          value: array[index].id,
          text: array[index].name
        })
      }
    } else {
      this.$addNotification('danger', response.response)
    }

    await this.$resource.resource(0, '/categories/parents')
    await this.$store.dispatch('getRes')
    response = JSON.parse(this.$store.state.res)

    if (response.status === true) {
      const array = response.data
      for (let index = 0; index < array.length; index++) {
        this.categories.push({
          value: array[index].id,
          text: array[index].name
        })
      }
    } else {
      this.$addNotification('danger', response.response)
    }
  }
}
</script>
<style lang="scss" scoped>
.save {
  float: right;
}

.label {
  float: left;
}

input:focus {
  border: 1px solid #2f0feb38;
  box-shadow: 0 0 5px #2f0feb38;
  outline-offset: 0;
  outline: none;
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
