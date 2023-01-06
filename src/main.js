import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {
  BootstrapVue,
  BootstrapVueIcons,
  BIconPencilSquare
} from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from '@vuelidate/core'
import setAuthHeader from './services/setAuthHeader'
import resource from './services/resourceAPI'
import addNotification from './services/addNotification'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAdd, faList, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import notificationComponent from '@/components/notifications/notificationComponent'
import NavBar from '@/components/layouts/NavBar'
import DeleteModal from '@/components/modals/DeleteModal'

library.add(faAdd, faList, faSignOut)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('BIconPencilSquare', BIconPencilSquare)
Vue.component('notificationComponent', notificationComponent)
Vue.component('NavBar', NavBar)
Vue.component('DeleteModal', DeleteModal)

// Vue.config.productionTip = false
Vue.prototype.$setAuthHeader = setAuthHeader
Vue.prototype.$addNotification = addNotification
Vue.prototype.$resource = resource
Vue.prototype.$store = store
Vue.prototype.$axios = axios
Vue.use(BootstrapVue)
  .use(BootstrapVueIcons)
  .use(VueCompositionAPI)
  .use(Vuelidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
