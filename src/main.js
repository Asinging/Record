import '@babel/polyfill'
import Vue from 'vue'
import './plugins/axios'

import './plugins/vuetify'
// import Vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
// import './sass/main.scss'
//import '@mdi/font/css/materialdesignicons.css'

//import './stylus/main.styl'n
//import Footer from "./components/footer.vue";
Vue.config.productionTip = false
import vuetify from "@/plugins/vuetify"
// Vue.use(Vuetify, {
//   iconfont: 'md'

// })


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')