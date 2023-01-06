import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    res: localStorage.getItem('res') || {},
    baseUrl: 'http://192.168.1.110:8081',
    url: 'http://192.168.1.110:8081/api',
    token: localStorage.getItem('access_token') || null,
    user: localStorage.getItem('user_info') || {},
    status: localStorage.getItem('api_status') || null,
    description: localStorage.getItem('api_description') || null,
    notifications: []
  },
  getters: {},
  mutations: {
    SET_RES (state, res) {
      state.res = res
    },
    GET_RES (state) {
      state.res = localStorage.getItem('res')
    },
    SET_STATUS (state, data) {
      state.status = data.status
    },
    GET_STATUS (state) {
      state.status = localStorage.getItem('api_status')
    },
    SET_DESCRIPTION (state, data) {
      state.description = data.description
    },
    GET_DESCRIPTION (state) {
      state.description = localStorage.getItem('api_description')
    },
    SET_TOKEN (state, data) {
      state.token = data.token
    },
    GET_TOKEN (state) {
      state.token = localStorage.getItem('access_token')
    },
    SET_USER (state, user) {
      state.user = user
    },
    GET_USER (state) {
      state.user = localStorage.getItem('user_info')
    },
    PUSH_NOTIFICATION (state, notification) {
      state.notifications.push({
        ...notification,
        id: (Math.random().toString(36) + Date.now().toString()).substr(2)
      })
    },
    REMOVE_NOTIFICATION (state, notificationToRemove) {
      state.notifications = state.notifications.filter(notification => {
        return notification.id !== notificationToRemove.id
      })
    }
  },
  actions: {
    setRes ({ commit }, res) {
      localStorage.setItem('res', JSON.stringify(res))
      commit('SET_RES', res)
    },
    getRes ({ commit }) {
      commit('GET_RES')
    },
    setToken ({ commit }, token) {
      localStorage.setItem('access_token', token)
      commit('SET_TOKEN', token)
    },
    getToken ({ commit }) {
      commit('GET_TOKEN')
    },
    setUser ({ commit }, user) {
      localStorage.setItem('user_info', JSON.stringify(user))
      commit('SET_USER', user)
    },
    getUser ({ commit }) {
      commit('GET_USER')
    },
    addNotification ({ commit }, notification) {
      commit('PUSH_NOTIFICATION', notification)
    },
    removeNotification ({ commit }, notification) {
      commit('REMOVE_NOTIFICATION', notification)
    },
    setStatus ({ commit }, status) {
      localStorage.setItem('api_status', status)
      commit('SET_STATUS', status)
    },
    getStatus ({ commit }) {
      commit('GET_STATUS')
    },
    setDescription ({ commit }, description) {
      localStorage.setItem('api_description', description)
      commit('SET_DESCRIPTION', status)
    },
    getDescription ({ commit }) {
      commit('GET_DESCRIPTION')
    }
  },
  modules: {}
})
