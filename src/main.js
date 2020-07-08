import '@babel/polyfill'
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from "jquery/dist/jquery.js"

// var popup = require("./jquery-popup-overlay")
//window.$ = $

//import store from './views/store/index.js'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false
import vuetify from "@/plugins/vuetify"
import 'sweetalert2/dist/sweetalert2.min.css';
import VueHtmlToPaper from "vue-html-to-paper";
import printJS from 'print-js';
import Loader from 'vue-loading-overlay'
import "vue-loading-overlay/dist/vue-loading.css"

Vue.use(Loader)





new Vue({

  router,
  store,
  vuetify,


  render: h => h(App)
}).$mount('#app')