import '@babel/polyfill'
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from "jquery/dist/jquery.js"
import qs from "qs"

// import io from 'socket.io-client';
// import VueSocketIO from 'vue-socket.io';

import './registerServiceWorker'

import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false
import vuetify from "@/plugins/vuetify"
import 'sweetalert2/dist/sweetalert2.min.css';
import VueHtmlToPaper from "vue-html-to-paper";
import printJS from 'print-js';
import Loader from 'vue-loading-overlay'

import "vue-loading-overlay/dist/vue-loading.css"
//  export const SocketIo = io.connect('http://localhost:1337')

Vue.use(VueSweetalert2, Loader)

new Vue({

  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')