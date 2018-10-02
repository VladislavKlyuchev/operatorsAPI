import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const link = window.link || 'http://172.21.229.81'
Vue.use(Vuex)

axios.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    return Promise.reject(error.response)
  }
)

export const store = new Vuex.Store({
  state: {
    auth: false,
    password: null,
    channelsWithPackage: null,
    operator: null,
    packages: null,
    users: null,
    history: null,
    channels: null
  },
  mutations: {
    popup (state, payload) {
      state.popup = payload
    },
    setChannels (state, payload) {
      state.channels = payload.channels
      state.channelsWithPackage = payload.channelsWithPackage
    },
    editChannel (state, id) {
      state.editChannel = state.channels.find(el => el.channelId == id)
    },
    deleteChannel (state, id) {
      state.deleteChannel = state.channels.find(el => el.id == id)
    },
    auth (state, payload) {
      state.auth = true
      state.password = payload.key
      state.operator = payload
    },
    setOperators (state, operators) {
      state.operators = operators
    },
    setUsers (state, users) {
      state.users = users
    },
    setHistory (state, payload) {
      state.history = payload
    }
  },
  actions: {
    asyncAuth ({ dispatch, commit }, key) {
      return new Promise(function (resolve, reject) {
        axios
          .post(`${link}/authOperator`, { key: key })
          .then(res => {
            commit('auth', res.data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getPackages ({ state, commit, dispatch }) {
      axios
        .post(`${link}/listPackagesWithPrices`, { key: state.password })
        .then(result => {
          state.packages = result.data
        })
    },
    getUsers ({ state, commit }) {
      const body = {
        key: state.password
      }
      axios.post(`${link}/getOperatorsUsers`, body).then(res => {
        commit('setUsers', res.data)
      })
    },
    createNewUser ({ dispatch, state }, body) {
      body.key = state.password
      axios.post(`${link}/createAccount`, body).then(() => {
        dispatch('getUsers')
      })
    },
    updateUser ({ dispatch, state }, body) {
      body.key = state.password
      console.log(body)
      axios.post(`${link}/operatorUpdateUser`, body).then(() => {
        dispatch('getUsers')
      })
    },
    getHistory ({ commit, state }) {
      axios
        .post(`${link}/userHistory`, { key: state.password })
        .then(result => {
          commit('setHistory', result.data)
        })
    }
  }
})
