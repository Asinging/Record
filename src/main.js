import '@babel/polyfill'
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from "jquery/dist/jquery.js"
import qs from "qs"
//Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}


// import io from 'socket.io-client';
// import VueSocketIO from 'vue-socket.io';

import './registerServiceWorker'

import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false
import vuetify from "@/plugins/vuetify"
import 'sweetalert2/dist/sweetalert2.min.css';
import VueHtmlToPaper from "vue-html-to-paper";
import printJS from 'print-js';
import "print-js/dist/print.css"
import Loader from 'vue-loading-overlay'

import "vue-loading-overlay/dist/vue-loading.css"




Vue.use(VueSweetalert2)

new Vue({

  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')