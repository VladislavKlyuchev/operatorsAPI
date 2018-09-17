// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { store } from '../store'
import veeValidate from 'vee-validate'
import 'vuetify/dist/vuetify.min.css'

Vue.use(veeValidate)
Vue.use(Vuetify, {
  theme: {
    primary: "#FF6D00", 
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
