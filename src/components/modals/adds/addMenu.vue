<template>
  <!-- <div class="popup"> -->
  <div class="popup-inner">
    <slot/>
    <div>
      <label class="label mb-2">Name</label>
      <input type="text" class="mb-2" v-model="name" placeholder="Name">

      <label class="label mb-2">Categories</label>
      <b-form-select multiple class="form-control form-control mb-2"
                     v-model="menuCategories"
                     :options="this.categories"></b-form-select>
    </div>
    <div class="buttons">
      <b-button class="save primary-back mt-2" variant="success" @click="add()">
        <div>Add</div>
      </b-button>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'addMenu',
  data () {
    return {
      categories: [],
      menuCategories: [],
      name: '',
      discount: 0,
      parent: 0
    }
  },
  methods: {
    async add () {
      const fd = new FormData()
      fd.append('name', this.name)
      fd.append('discount', this.discount)
      if (this.menuCategories.length !== 0) {
        for (let i = 0; i < this.menuCategories.length; i++) {
          fd.append(`category[${i}]`, this.menuCategories[i])
        }
      }
      await this.$resource.resource(1, '/menus', fd)
      await this.$store.dispatch('getRes')
      const response = JSON.parse(this.$store.state.res)

      if (response.status === true) {
        // console.log(response.message)
        this.$addNotification('success', response.message)
        this.$router.go()
      } else {
        this.$addNotification('danger', response.message)
      }
    }
  },
  async mounted () {
    await this.$resource.resource(0, '/categories/parents')
    await this.$store.dispatch('getRes')
    const response = JSON.parse(this.$store.state.res)

    if (response.status) {
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
<!-- <style lang="scss" scoped>
  .popup-inner {

    background-color: #f5f5f5;
    padding: 2vw;
    border-radius: 10px;
    width: 45%;
    height: 40%;
    box-shadow: 5px 8px 9px -6.5px #665650 !important;
    align-items: center;
    justify-content: center;
    text-align: center;

    .popup-title {
      font-weight: 600;
      width: 100%;
      float: left;
      font-size: 1.8vw;
      margin-bottom: 2vh;
      margin-top: 2vh;
    }

    .buttons {
      text-align: center;
      align-items: center;
      justify-content: center;

      .close {
        background-color: #2e2a29 !important;
      }

      button {
        padding: 0.8em 2.5em;
        margin-top: 2.5vh;
        margin-right: 1.2vw;
        margin-bottom: 1.2vh;
        display: inline-block;
        font-size: 1vw !important;
        opacity: 0.8;
        border-radius: 5px;
        border: 0;
        color: #ffffff;
        justify-content: center;
        /*line-height: 20px;*/
        width: 50%;
        height: 50%;
        /*max-width: 480px;*/
        overflow: hidden;
        text-align: center;
        /*touch-action: manipulation;*/
        font-family: 'ElMessiriRegular', sans-serif !important;
      }
    }

    input:focus {
      border: 1px solid #2f0feb38;
      box-shadow: 0 0 5px #2f0feb38;
      outline-offset: 0;
      outline: none;
    }

    input {
      background: transparent;
      border-radius: 6px;
      padding-left: 20px;
      display: block;
      width: 100%;
      height: 50%;
      border: 0.5px solid #2f0feb38;
    }
  }
</style> -->
