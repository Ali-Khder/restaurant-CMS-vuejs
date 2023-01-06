<template>
  <!-- <div class="popup"> -->
  <div class="popup-inner">
    <slot />
    <div>
      <label class="label mb-2">Title</label>
      <input type="text" class="mb-2" v-model="title" placeholder="Title...">
      <label class="label mb-2">Content</label>
      <div class="editor-container">
        <div id="editorjs"></div>
        <!-- <editor ref="editor" :config="config" holder-id="codex-editor" save-button-id="save-button"
          @save="this.onSave()" /> -->
      </div>
    </div>
    <div class="buttons">
      <b-button class="save primary-back mt-2" variant="success" @click="save()">
        <div>Add</div>
      </b-button>
    </div>
  </div>
</template>

<script>
import EditorJs from '@editorjs/editorjs'
import Header from '@editorjs/header'
import DeleteModal from '../DeleteModal.vue'
export default {
  name: 'addArticle',
  data () {
    return {
      title: '',
      selectedFile: [],
      content: {
        text: ''
      },
      editor: null
    }
  },
  methods: {
    async save () {
      this.editor.save().then((data) => {
        this.convertToHTML(data.blocks)
      }).catch((error) => {
        console.log('Saveing failed: ', error)
      })
    },
    async convertToHTML (data) {
      console.log('response: ', data)
      data.forEach(obj => {
        switch (obj.type) {
          case 'paragraph':
            this.content.text += `<p>${obj.data.text}</p>`
            break
          default:
            return ''
        }
      })
      console.log('response after: ', this.content.text)

      const fd = new FormData()
      fd.append('title', this.title)
      fd.append('text', this.content.text)
      await this.$resource.resource(1, '/articles', fd)
      await this.$store.dispatch('getRes')
      const response = JSON.parse(this.$store.state.res)
      if (response.status) {
        this.$addNotification('success', 'success')
        // this.$router.go()
      } else {
        this.$addNotification('danger', response.message)
      }
    }
  },
  mounted () {
    this.editor = new EditorJs({
      holder: 'editorjs',

      tools: {
        header: {
          class: Header
        },
        delete: {
          class: DeleteModal
        }
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.editor-container {
  border: 1px solid #2f0feb38;
  margin-top: 2.5rem;
}

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
