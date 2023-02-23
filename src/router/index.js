import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: () =>
    import('../views/LoginView.vue')
}, {
  path: '/register',
  name: 'register',
  component: () =>
    import('../views/RegisterView.vue')
}, {
  path: '/',
  name: 'home',
  component: () =>
    import('../views/articleView.vue')
}]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeEach(async (to, from, next) => {
  store.dispatch('getUser')
  store.dispatch('getToken')
  const token = store.state.token

  const publicPages = ['/login', '/register', '/guest']
  const authReaquired = !publicPages.includes(to.path)
  console.log(authReaquired)
  console.log(from.path)

  if (to.path === '/register' || to.path === '/login' ||
        to.path === '/guest') { next() }

  if (authReaquired && !token) {
    console.log('not logged')
    return next('/login')
  } else return next()

  // if (to.path === '/login' || to.path === '/register') {
  //     if (token) {
  //         console.log('logged')
  //         return next('/')
  //     } else {
  //         next()
  //     }
  // } else {
  //     next()
  // }
})
export default router
