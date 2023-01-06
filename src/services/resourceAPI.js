import store from '@/store/index'
import axios from 'axios'
import router from '@/router'
import setAuthHeader from '@/services/setAuthHeader'

async function resource (type, api, body = null) {
  setAuthHeader(store.state.token)
  if (type === 0) {
    await axios
      .get(`${store.state.url}${api}`)
      .then((response) => {
        console.log(response.data)
        store.dispatch('setRes', response.data)
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          this.$router.push({ name: 'login' })
          localStorage.clear()
        } else {
          store.dispatch('setRes', error.response)
        }
      })
  } else if (type === 1) {
    await axios
      .post(`${store.state.url}${api}`, body)
      .then((response) => {
        console.log(response)
        store.dispatch('setRes', response.data)
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          router.push({ name: 'login' })
          localStorage.clear()
        } else {
          console.log(error.response)
          store.dispatch('setRes', error.response)
        }
      })
  } else if (type === 2) {
    await axios
      .delete(`${store.state.url}${api}`)
      .then((response) => {
        console.log(response)
        store.dispatch('setRes', response.data)
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          router.push({ name: 'login' })
          localStorage.clear()
        } else {
          console.log(error.response)
          store.dispatch('setRes', error.response)
        }
      })
  }
}

export default { resource }
