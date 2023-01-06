import store from '@/store/index'

const addNotification = (type, msg) => {
  store.dispatch('addNotification', {
    type: type,
    message: msg
  })
}

export default addNotification
