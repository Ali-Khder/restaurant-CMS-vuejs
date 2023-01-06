<template>
  <!-- <div class="popup"> -->
  <div class="popup-inner">
    <slot/>
    <div>
      <label class="label mb-2">Name</label>
      <input type="text" class="mb-2" v-model="name" placeholder="Name...">
      <label class="label mb-2">Price</label>
      <input type="text" class="mb-2" v-model="price" placeholder="Price...">
      <label class="label mb-2">Description</label>
      <input type="text" class="mb-2" v-model="description" placeholder="Description...">
      <label class="label mb-2">Owner's number</label>
      <input type="text" class="mb-2" v-model="ownerNumber" placeholder="owner's number...">
      <label class="label mb-2">Specialty</label>
      <b-form-select class="form-control form-control mb-2" v-model="specialty" :options="this.specialties">
      </b-form-select>
      <label class="label mb-2">Image</label>
      <input class="upload mb-3" type="file" accept="image/*" placeholder="Choose image" multiple @change="onSelectedFiles($event.target.files)">
    </div>
    <div class="buttons">
      <b-button class="save primary-back mt-2" variant="success" @click="add()">
        <div>Update</div>
      </b-button>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'updateItem',
  props: ['id'],
  data () {
    return {
      name: '',
      price: '',
      description: '',
      ownerNumber: '',
      specialty: null,
      specialties: [
        {
          value: null,
          text: 'Select One',
          disabled: true
        }
      ],
      selectedFile: []
    }
  },
  methods: {
    onSelectedFiles (fileList) {
      this.selectedFile = fileList
    },
    async add () {
      console.log(this.specialty)
      const fd = new FormData()
      fd.append('name', this.name)
      fd.append('price', this.price)
      fd.append('description', this.description)
      fd.append('specialityID', this.specialty)
      fd.append('owner_number', this.ownerNumber)
      if (this.selectedFile.length !== 0) {
        fd.append('file1', this.selectedFile[0])
        if (this.selectedFile.length !== 1) {
          fd.append('file2', this.selectedFile[1])
          if (this.selectedFile.length !== 2) {
            fd.append('file3', this.selectedFile[2])
          }
        }
      }
      await this.$resource.resource(1, '/item/' + this.id, fd)
      await this.$store.dispatch('getRes')
      const response = JSON.parse(this.$store.state.res)

      if (response.status) {
        // console.log(response.message)
        this.$addNotification('success', 'success')
        this.$router.go()
      } else {
        this.$addNotification('danger', response.response)
      }
    }
  },
  async mounted () {
    await this.$resource.resource(0, '/specialty')
    await this.$store.dispatch('getRes')
    let response = JSON.parse(this.$store.state.res)

    if (response.status) {
      const array = response.response
      for (let index = 0; index < array.length; index++) {
        this.specialties.push({
          value: array[index].id,
          text: array[index].name
        })
      }
    } else {
      this.$addNotification('danger', response.response)
    }

    await this.$resource.resource(0, '/item/' + this.id)
    await this.$store.dispatch('getRes')
    response = JSON.parse(this.$store.state.res)

    if (response.status) {
      this.name = response.response.name
      this.price = response.response.price
      this.description = response.response.description
      this.ownerNumber = response.response.owner_number
      this.specialty = response.response.specialityID
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
