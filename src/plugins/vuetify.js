import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

//import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

import { preset } from 'vue-cli-plugin-vuetify-preset-crane/preset'


Vue.use(Vuetify)

export default new Vuetify({
  preset,
  icons: {
    iconfont: ' mdi',
  },



  theme: {
    // themes: {
    //   light: {
    //     primary: 'orange',
    //     secondary: '#424242',
    //     accent: '#82B1FF',
    //     error: '#FF5252',
    //     info: '#2196F3',
    //     success: '#4CAF50',
    //     warning: '#FFC107'

    //   },
    //   dark: {
    //     primary: 'green',
    //     secondary: '#424242',
    //     accent: '#82B1FF',
    //     error: '#FF5252',
    //     info: '#2196F3',
    //     success: '#4CAF50',
    //     warning: '#FFC107'
    //   }
    // }

  },



  theme: {
    light: true
  }
})