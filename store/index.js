import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const link = 'http://192.168.22.120:5000'
const pass = 123321
Vue.use(Vuex)

axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  return Promise.reject(error.response);
});

export const store = new Vuex.Store({
  state: {
    auth: false,
    password: 123321,
    channelsWithPackage: null,
    operator: null,
    packages: null,
    users: null,
    channels: null
  },
  mutations: {
    popup(state, payload) {
      state.popup = payload
    },
    setChannels(state, payload) {
      state.channels = payload.channels
      state.channelsWithPackage = payload.channelsWithPackage
    },
    editChannel(state, id) {
      state.editChannel = state.channels.find(el => el.channelId == id)
    },
    deleteChannel(state, id) {
      state.deleteChannel = state.channels.find(el => el.id == id)
    },
    auth(state, payload) {
        state.auth = true
        state.password = payload.key
        state.operator = payload
    },
    setOperators(state, operators) {
      state.operators = operators
    },
    setUsers(state, users) {
      state.users = users
    }
  },
  actions: {
    asyncAuth({ dispatch, commit }, key) {
      return new Promise(function(resolve,reject) {
        axios.post(`${link}/authOperator`, {key: key})
        .then((res) => {
          commit('auth', res.data)
          resolve()
        })
        .catch(err => {
          reject()
        }) 
      })
    },
    getChannels({ state, commit }) {
      axios.post(`${link}/allChannels`, { key: state.password }).then(res => {
        commit('setChannels', res.data)
      })
    },
    getPackages({ state, commit, dispatch }) {
      axios.post(`${link}/listPackagesWithPrices`, { key: state.password }).then(result => {
        state.packages = result.data
      })
    },
    sortChannels({ state, commit, dispatch }, channels) {
      axios
        .post(`${link}/sortChannels`, { channels: channels, dashboard: pass })
        .then(() => {
          dispatch('getChannels')
        })
    },
    getUsers({ commit }) {
      const body = {
        dashboard: pass
      }
      axios.post(`${link}/getUsers`, body).then(res => {
        commit('setUsers', res.data)
      })
    },
    createNewUser({ dispatch }, body) {
      body.dashboard = pass
      axios.post(`${link}/createNewUser`, body).then(() => {
        dispatch('getUsers')
      })
    },
    updateUser({ dispatch }, body) {
      body.dashboard = pass
      axios.post(`${link}/operatorUpdateUser`, body).then(() => {
        dispatch('getUsers')
      })
    },
    deleteUser({ dispatch }, body) {
      body.dashboard = pass
      axios.post(`${link}/deleteUser`, body).then(() => {
        dispatch('getUsers')
      })
    }
  }
})
